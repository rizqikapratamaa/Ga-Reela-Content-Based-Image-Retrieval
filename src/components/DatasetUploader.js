import React, { useState } from 'react';
import axios from 'axios';

const DatasetUploader = (props) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    setSelectedFiles(files);
  };

  const handleUpload = async () => {
    if (selectedFiles.length > 0) {
      const formData = new FormData();

      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('files', selectedFiles[i]);
      }

      try {
        const response = await axios.post('http://localhost:8000/upload-dataset', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Handle the response as needed
        console.log('Dataset uploaded successfully:', response.data);
      } catch (error) {
        // Handle errors
        console.error('Error uploading dataset:', error);
      }
    } else {
      // Handle case where no files are selected
      console.error('No files selected for upload.');
    }
  };

  return (
    <div>
      <input type='file' directory="" webkitdirectory="" onChange={handleFileChange} className='font-inter text-white'/>
      <div className='rounded mt-8 mb-10 w-[250px] h-[35px] relative 
          before:content-[""] before:absolute before:top-0 before:left-0 before:h-[100%] before:w-[100%] before:bg-gradient before:-z-1 before:rounded-[20px]
          after:content-[""] after:absolute after:top-0 after:left-0 after:h-[100%] after:w-[100%] after:bg-gradient after:blur-[20px] after:-z-1 flex items-center justify-center after:rounded-[15px]'>
      <button onClick={handleUpload} className='font-inter-bold text-xl text-white z-10 hover:scale-105 cursor-pointer transition-all'>Upload Dataset</button>
      </div>
    </div>
  );
};

export default DatasetUploader;