# File: searcher.py
import numpy as np
import csv

class ColorSearcher:
    def __init__(self, indexPath, blocks = 2):
        self.indexPath = indexPath # Menyimpan lokasi dari indeks file csv
        self.blocks = blocks # Menyimpan jumlah blok

    def search(self, queryFeatures, limit=None):
        result = {} # Inisiasi dictionary untuk menyimpan hasil pencarian

        with open(self.indexPath) as f: # Membuka file csv menggunakan with
            reader = csv.reader(f) # Membaca file csv dengan csv reader
            next(reader)  # Lewati baris pertama (header)

            for row in reader: # Loop setiap baris file csv
                features = [float(x) for x in row[1:]] # Mengonversi nilai fiture dari string ke float
                d = self.cosine_similarity(features, queryFeatures) # Menghitung cosine similarity antara fitur baris saat ini dengan fitur query

                result[row[0]] = d # # Menyimpan hasil similarity ke dalam dictionary dengan kunci berupa nilai dari kolom pertama (nama gambar)
            f.close() # Tutup file csv setelah dibaca

        # Mengurutkan hasil berdasarkan nilai similarity secara descending
        results = sorted([(v, k) for (k, v) in result.items()], reverse=True)

        return results[:limit] # Mengembalikan hasil pencarian dari baris 1 sampai baris limit

    def cosine_similarity(self, vector1, vector2):
        dot_product = np.dot(vector1, vector2) # Menghitung dot product antara dua vektor
        norm_vector1 = np.linalg.norm(vector1) # Menghitung norma (panjang) verktor pertama
        norm_vector2 = np.linalg.norm(vector2) # Menghitung norma (panjang) vektor kedua

        similarity = dot_product / (norm_vector1 * norm_vector2) # Menghitung cosine similarity

        return similarity # Mengembalikan nilai cosine similarity
