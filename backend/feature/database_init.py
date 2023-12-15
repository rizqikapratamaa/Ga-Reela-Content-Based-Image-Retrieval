from joblib import Parallel, delayed
import csv
import glob
import cv2
import time
import texture_descriptor
from color_descriptor import ColorDescriptor

start_time = time.perf_counter()

output_path_color = "src/conf/conf_color.csv" # Lokasi hasil ekstraksi fitur warna
output_path_texture = "src/conf/conf_texture.csv" # Lokasi hasil ekstraksi fitur tekstur

# Inisialisasi ColorDescriptor dengan parameter yang sesuai
cd = ColorDescriptor((8, 12, 3), blocks = 2)

def process_image(imagePath):
    imageID = imagePath[imagePath.rfind("\\") + 1:] # Mendapatkan ID gambar dari path
    image = cv2.imread(imagePath) # Membaca gambar menggunakan OpenCV
    r, g, b = cv2.split(image)

    # Gunakan describe dari ColorDescriptor untuk mendapatkan fitur warna
    features_color = cd.describe(image)

    # Gunakan Tekstur_Feature dari modul texture untuk mendapatkan fitur tekstur
    features_texture = texture_descriptor.Tekstur_Feature(image, r, g, b)

    # Tulis data ke CSV
    return {'imageID': imageID, 'features_color': features_color, 'features_texture': features_texture}

with open(output_path_color, 'w', newline='') as csvfile_color, open(output_path_texture, 'w', newline='') as csvfile_texture: # Penulisan file CSV
    writer_color = csv.writer(csvfile_color)
    writer_texture = csv.writer(csvfile_texture)

    # Proses pencarian dan penyimpanan data ke CSV menggunakan parallel processing
    results = Parallel(n_jobs=-1)(delayed(process_image)(imagePath) for imagePath in glob.glob("src/database/*"))

    # Menulis hasil ke dalam file CSV
    for result in results:
        writer_color.writerow([result['imageID']] + result['features_color'])
        writer_texture.writerow([result['imageID']] + list(result['features_texture']))

end_time = time.perf_counter()

elapsed_time = end_time - start_time
print(f"Elapsed time: {elapsed_time}")
