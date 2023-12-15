import React, { useState } from 'react';
import axios from 'axios';

const ImageScraper = () => {
  const [input, setInput] = useState('');

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/scrape', { url: input });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'row' }}>
        <label className='w-[500px] mb-[20px]'>
          <div className='mb-[20px] font-inter-bold text-2xl text-white'>Image Scrapper</div>
          <input className='w-[500px] font-inter rounded-[10px] border-2 border-green-600' type="text" value={input} onChange={handleChange} />
        </label>
        <div className = 'rounded my-[25px] w-[250px] h-[35px] relative before:content-[""] before:absolute before:top-0 before:left-0 before:h-[100%] before:w-[100%] before:bg-gradient before:-z-1 before:rounded-[20px] after:content-[""] after:absolute after:top-0 after:left-0 after:h-[100%] after:w-[100%] after:bg-gradient after:blur-[20px] after:-z-1 flex items-center justify-center after:rounded-[15px] translate-x-[20px] translate-y-[20px]'>
        <button type="submit" className='font-inter-bold text-white text-l z-10 translate-x-[-4px] hover:scale-105 cursor-pointer transition-all' style={{ marginLeft: '10px' }}>  Submit </button>
        </div>
      </form>
    </div>
  );
};

export default ImageScraper;
