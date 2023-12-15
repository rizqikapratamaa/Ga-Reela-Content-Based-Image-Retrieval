import csv
import texture_descriptor

class TextureSearcher:
    def __init__(self, indexPath):
        # simpan index path
        self.indexPath = indexPath

    def search(self, queryFeatures, limit=None):
        # buka file index untuk membaca
        with open(self.indexPath) as f:
            # inisialisasi CSV reader
            reader = csv.reader(f)

            # inisialisasi kamus hasil pencarian
            results = {}

            # loop pada baris dalam file index
            for row in reader:
                # hitung jarak antara fitur dalam index dan fitur query
                features = [float(x) for x in row[1:]]
                d = texture_descriptor.similarity(*features, *queryFeatures)

                # update hasil pencarian
                results[row[0]] = d

            # tutup reader
            f.close()

        # sort hasil pencarian sehingga gambar dengan jarak terkecil (yaitu gambar yang paling mirip) berada di depan
        results = sorted([(v, k) for (k, v) in results.items()], reverse=True)

        return results[:limit] # Mengembalikan hasil pencarian dari baris 1 sampai baris limit