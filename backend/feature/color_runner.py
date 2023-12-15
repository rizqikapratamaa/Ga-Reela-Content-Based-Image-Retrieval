from color_descriptor import ColorDescriptor
from color_searcher import ColorSearcher
import math
import cv2
import json
import time

start_time = time.perf_counter()
gambar = "src/uploads/uploaded.jpg" # Lokasi gambar query

cd = ColorDescriptor((8, 12, 3)) # Inisiasi ColorDescriptor dengan tuple parameter (8, 12, 3)
query = cv2.imread(gambar) # Membaca gambar query dengan OpenCV
features = cd.describe(query) # Mendeskripsikan fitur warna dari gambar query dengan ColorDescriptor

searcher = ColorSearcher('src/conf/conf_color.csv') # Inisiasi ColorSearcher dengan path indeks di src
results = searcher.search(features)

match = 0
result_color = {}
for (score, resultID) in results:
    if score * 100 > 60:  # Hanya tampilkan jika kemiripan di atas 60%
        result = cv2.imread(resultID) # Membaca gambar hasil dengan OpenCV
        result_color[resultID.split('/')[-1]] = f"{math.floor(score * 100):.2f}%"
        match += 1

# Mengurutkan result_color berdasarkan nilai kemiripan
result_color = {k: v for k, v in sorted(result_color.items(), key=lambda item: float(item[1][:-1]), reverse=True)}

end_time = time.perf_counter()
elapsed_time = end_time - start_time

result_color["Elapsed Time"] = elapsed_time
result_color["Number of Matches"] = match

with open('src/conf/result_color.json', 'w') as file:
    json.dump(result_color, file, indent=4)
