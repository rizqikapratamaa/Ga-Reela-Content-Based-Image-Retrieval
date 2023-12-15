import numpy as np
import cv2

class ColorDescriptor:
    def __init__(self, bins, blocks = 2): # Mengatur jumlah bins histogram dan banyak blok gambar akan dibagi
        self.bins = bins
        self.blocks = blocks

    def describe(self, image):  # Menghitung deskripsi warna dari gambar, membagi gambar jadi empat blok dan histogram warna dihitung untuk setiap blok
        image = image.astype("float") / 255.0   # Normalisasi gambar jadi rentang 0 - 1

        features = [] # Menginisiasi features sebagai array kosong

        # Menghitung ukuran tiap kotak
        (h, w) = image.shape[:2]
        block_size_x = w // self.blocks
        block_size_y = h // self.blocks

        # Menghitung batas-batas blok berdasarkan ukuran blok dan posisi blok dalam gambar
        for i in range(self.blocks):
            for j in range(self.blocks):
                block_startX = i * block_size_x
                block_endX = (i + 1) * block_size_x
                block_startY = j * block_size_y
                block_endY = (j + 1) * block_size_y

                # Memotong blok gambar dan mengonversi nilai pixel ke rentang 0 - 255
                block = image[block_startY:block_endY, block_startX:block_endX]
                block = (block * 255).astype(np.uint8)

                # Hitung rata-rata HSV blok
                hsv_block = cv2.cvtColor(block, cv2.COLOR_RGB2HSV)

                # Hitung histogram blok
                hist = self.histogram(hsv_block)
                features.extend(hist)

        return features

    # Hitung histogram dalam ruang warna hsv
    def histogram(self, hsv):
        hist = cv2.calcHist([hsv], [0, 1, 2], None, self.bins, [0, 180, 0, 256, 0, 256])
        hist = cv2.normalize(hist, hist).flatten() # Normalisasi dan ubah menjadi array satu dimensi

        return hist