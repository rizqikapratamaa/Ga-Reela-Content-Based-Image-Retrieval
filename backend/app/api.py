from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from pydantic import BaseModel
from typing import List
from starlette.exceptions import HTTPException
import os
import shutil
import subprocess
import urllib.request
import requests
from bs4 import BeautifulSoup
import csv

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "src/uploads/"
UPLOAD_DATASET_FOLDER = "src/database/"
CSV_FILE_PATH = "src/conf/image_scraper.csv"

@app.on_event("startup")
async def startup_event():
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)

def is_image(filename):
    allowed_extensions = {".jpg", ".jpeg", ".png"}
    return any(filename.lower().endswith(ext) for ext in allowed_extensions)

@app.post("/upload")
async def upload_file(file: UploadFile):
    if not file:
        raise HTTPException(status_code=400, detail="Tidak ada file yang diunggah.")
    
    if not is_image(file.filename):
        raise HTTPException(status_code=400, detail="Berkas yang diunggah bukan gambar.")
    
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    
    with open(file_path, "wb") as f:
        f.write(file.file.read())
    subprocess.run(["python", "backend/feature/color_runner.py"], check=True)
    subprocess.run(["python", "backend/feature/texture_runner.py"], check=True)

@app.post("/upload-dataset")
async def upload_dataset(files: List[UploadFile] = File(...)):
    for filename in os.listdir(UPLOAD_DATASET_FOLDER):
        file_path = os.path.join(UPLOAD_DATASET_FOLDER, filename)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
        except Exception as e:
            print('Failed to delete %s. Reason: %s' % (file_path, e))

    for file in files:
        if not is_image(file.filename):
            raise HTTPException(status_code=400, detail="Berkas yang diunggah bukan gambar")
        file_path = os.path.join(UPLOAD_DATASET_FOLDER, os.path.basename(file.filename))

        with open(file_path, "wb") as f:
            f.write(file.file.read())
    
    subprocess.run(["python", "backend/feature/database_init.py"], check=True)
    return JSONResponse(content={"message" : "Dataset berhasil diunggah"})

class Item(BaseModel):
    url: str


@app.post("/scrape")
async def scrape_images(item: Item):
    url = item.url
    try:
        response = requests.get(url)
    except requests.exceptions.RequestException as e:
        return JSONResponse(content={"message" : f"Error accessing {url}: {str(e)}"})

    soup = BeautifulSoup(response.text, 'html.parser')
    images = soup.find_all('img')

    # Hapus semua file dalam direktori 'src/database'
    folder = 'src/database/'
    for filename in os.listdir(folder):
        file_path = os.path.join(folder, filename)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
        except Exception as e:
            print('Failed to delete %s. Reason: %s' % (file_path, e))

    # Mulai scraping gambar
    for i, image in enumerate(images):
        image_url = image['src']
        if 'http' not in image_url:
            if image_url[0] != '/':
                image_url = '/' + image_url
            image_url = 'http://' + urllib.parse.urlparse(url).netloc + image_url
        try:
            filename = f'src/database/{i}.jpg'
            urllib.request.urlretrieve(image_url, filename)
        except Exception as e:
            return JSONResponse(content={"message" : f"Error downloading image from {image_url}: {str(e)}"})

    subprocess.run(["python", "backend/feature/database_init.py"], check=True)
    subprocess.run(["python", "backend/feature/color_runner.py"], check=True)
    subprocess.run(["python", "backend/feature/texture_runner.py"], check=True)
    
    return JSONResponse(content={"message" : "Images scraped successfully"})
