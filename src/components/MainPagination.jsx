import React, { useState, useEffect } from 'react';

const MainPagination = ({ imageData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [images, setImages] = useState([]); // State untuk menyimpan gambar

  const itemsPerPage = 6;

  const imageKeys = Object.keys(imageData).filter(key => key !== 'Elapsed Time' && key !== 'Number of Matches');
  const totalPages = Math.ceil(imageKeys.length / itemsPerPage);

  useEffect(() => {
    displayImages();
  }, [currentPage]); // Menjalankan displayImages setiap kali currentPage berubah

  const displayImages = async () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageImages = imageKeys.slice(startIndex, endIndex);

    const images = await Promise.all(pageImages.map(async (key, index) => {
      const { default: ImageComponent } = await import(/* webpackMode: "eager" */ `../database/${key}`);
      const percentage = imageData[key]; // Ambil persentase langsung dari data JSON
      
      return (
        <div key={index} className="image-item-wrapper w-[33.33%] p-2">
          <img
            key={index}
            src={ImageComponent}
            alt={key}
            className="image-item h-[350px] w-[350px] object-cover rounded-xl"
          />
          <div className="font-inter-bold text-white">{percentage}</div>
        </div>
      );
    }));

    // Menggunakan setState atau fungsi render kembali untuk memperbarui tampilan setelah import selesai
    setImages(images);
  };

  const createPaginationButtons = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
        pageNumbers.push(i);
      } else if (i === currentPage - 3 || i === currentPage + 3) {
        pageNumbers.push('...');
      }
    }
  
    return pageNumbers.map((page, index) => (
      <button
        key={index}
        className={`pagination-button ${currentPage === page ? 'active' : ''}`}
        onClick={() => setCurrentPage(page)}
      >
        {page}
      </button>
    ));
  };
  
  

  return (
    <div>
      <div className="image-container">{images}</div>
      <div className="pagination-container">{createPaginationButtons()}</div>
    </div>
  );
};

export default MainPagination;