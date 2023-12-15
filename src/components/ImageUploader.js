import React, { useState } from 'react';
import axios from 'axios';
// import { BrowserRouter as Link } from 'react-router-dom';

function ImageUploader() {
  const [file, setFile] = useState(null);

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const onUpload = async () => {
    // if (file) {
    //   const formData = new FormData();
    //   formData.append('file', file, "uploaded.jpg");

    //   try {
    //     await axios.post('http://localhost:8000/upload', formData, {
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //       },
    //     });
    //     alert('Gambar berhasil diunggah.');
    //   } catch (error) {
    //     console.error('Error mengunggah gambar:', error);
    //   }
    // } else {
    //   alert('Pilih sebuah gambar terlebih dahulu.');
    // }
    if (file) {
      const formData = new FormData();
      formData.append('file', file, "uploaded.jpg");
  
      try {
        // Mengirim gambar ke backend
        const response = await axios.post('http://localhost:8000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        // Handle hasil ekstraksi fitur dari backend
        const extractedFeatures = response.data.features;
        console.log('Fitur yang diekstraksi:', extractedFeatures);
  
        alert('Gambar berhasil diunggah.');
      } catch (error) {
        console.error('Error mengunggah gambar:', error);
      }
    } else {
      alert('Pilih sebuah gambar terlebih dahulu.');
    }
  };

  return (
    // <div>
    //   {/* <nav>
    //     <button>
    //       <Link to="/">Home</Link>
    //     </button>
    //   </nav> */}
    //   <input type="file" onChange={onFileChange} />
    //   <button onClick={onUpload}>Unggah Gambar</button>
    // </div>
    <div className='flex flex-col items-center mt-[150px]'>
      <input className='text-white' type="file" onChange={onFileChange} />
        <div className='rounded my-[25px] w-[250px] h-[35px] relative 
          before:content-[""] before:absolute before:top-0 before:left-0 before:h-[100%] before:w-[100%] before:bg-gradient before:-z-1 before:rounded-[20px]
          after:content-[""] after:absolute after:top-0 after:left-0 after:h-[100%] after:w-[100%] after:bg-gradient after:blur-[20px] after:-z-1 flex items-center justify-center after:rounded-[15px]' >
      <button className='z-10 font-inter-bold hover:scale-105 cursor-pointer transition-all' onClick={onUpload}>Search</button>
        </div>
    </div>
  );
}

export default ImageUploader;