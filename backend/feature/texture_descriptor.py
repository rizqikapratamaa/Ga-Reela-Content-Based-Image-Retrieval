import cv2
import numpy as np

#Menormalisasi gambar berwarna menjadi grayscale sesuai dengan spesifikasi
def Normalisasi(r,g,b):
    r = r * 0.29
    g = g * 0.587
    b = b * 0.114
    y = r + g + b
    return y

def coocurenceMatrix(list, tinggi, lebar):
    coocurence = np.zeros((256,256), np.int64)

    for i in range(tinggi):
        for j in range(lebar-1):
            X = round(list[i,j])
            Y = round(list[i,j+1])
            coocurence[X,Y] += 1

    return coocurence


def symmetricMatrix(matrix):
    symMatrix = np.zeros((256,256), dtype=float)
    
    symMatrix = matrix + np.transpose(matrix)
    
    return symMatrix


def normalizationMatrix(matrix):
    divisor = np.sum(matrix)
    
    normalization = np.zeros((256,256),dtype=float)
    normalization = matrix / divisor

    return normalization

def contrast(matrix):
    return (np.sum(np.square(np.arange(256)[:, np.newaxis] - np.arange(256)) * matrix))

def entropy(matrix):
    return -(np.sum(matrix * np.log(matrix + 1e-8)))


def homogenity(matrix):
    return np.sum(matrix / (1 + np.abs(np.arange(256)[:, np.newaxis] - np.arange(256))))

def Tekstur_Feature(image, r, g, b):
    tinggi, lebar, _ = image.shape
    list_Y = np.zeros((tinggi,lebar))

    list_Y = Normalisasi(r,g,b)

    coocurence = coocurenceMatrix(list_Y, tinggi, lebar)
    symmetric_cooc = symmetricMatrix(coocurence)
    normalization = normalizationMatrix(symmetric_cooc)

    Contrast = contrast(normalization)
    print("Contrast:", Contrast)
    Homogenity = homogenity(normalization)
    print("Homogenity:", Homogenity)
    Entropy = entropy(normalization)
    print("Entropy:", Entropy)

    return Contrast, Homogenity, Entropy


def similarity(Contrast1, Homogenity1, Entropy1, Contrast2, Homogenity2, Entropy2):
    vectorA = np.array([Contrast1, Homogenity1, Entropy1])
    vectorB = np.array([Contrast2, Homogenity2, Entropy2])

    dot_product = np.sum(vectorA * vectorB)
    norm_A = np.linalg.norm(vectorA)
    norm_B = np.linalg.norm(vectorB)
    return (dot_product / (norm_A * norm_B))