from texture_searcher import TextureSearcher
import cv2
import json
import time
import math
import texture_descriptor

start_time = time.perf_counter()
gambar = "src/uploads/uploaded.jpg" # Lokasi gambar query

# Membaca gambar query dengan OpenCV
query = cv2.imread(gambar)
r, g, b = cv2.split(query)

# Mendeskripsikan fitur tekstur dari gambar query dengan Tekstur_Feature
features = texture_descriptor.Tekstur_Feature(query, r, g, b)

# Inisiasi TextureSearcher dengan path indeks di src
searcher = TextureSearcher('src/conf/conf_texture.csv')

# Melakukan pencarian kemiripan fitur dengan fitur query
results = searcher.search(features)

match = 0
result_texture = {}
for (score, resultID) in results:
    if score * 100 > 60:  # Hanya tampilkan jika kemiripan di atas 60%
        match += 1
        result_texture[resultID.split('/')[-1]] = f"{math.floor(score * 100):.2f}%"

# Mengurutkan result_texture berdasarkan nilai kemiripan
result_texture = {k: v for k, v in sorted(result_texture.items(), key=lambda item: float(item[1][:-1]), reverse=True)}

end_time = time.perf_counter()
elapsed_time = end_time - start_time

result_texture["Elapsed Time"] = elapsed_time
result_texture["Number of Matches"] = match

with open('src/conf/result_texture.json', 'w') as file:
    json.dump(result_texture, file, indent=4)
