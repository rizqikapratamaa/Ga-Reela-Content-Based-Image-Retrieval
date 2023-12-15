import React from 'react'
import Bg from'../assets/background-website.jpg'
import logo from '../assets/ga-reela-high-resolution-logo-white-transparent-crop.png'
import icon from '../assets/upload-icons-white.png'
import upload from '../uploads/uploaded.jpg'
import ImageUploader from './ImageUploader'
import CameraUploader from './CameraUploader'
import { useState } from 'react';
// import Switch from './Switch'
import DatasetUploader from './DatasetUploader'
import MainPagination from './MainPagination'
import dataColor from '../conf/result_color.json'
import dataTexture from '../conf/result_texture.json'
import ImageScraper from './ImageScraper'

const Cbir = () => {
  const [uploadMode, setUploadMode] = useState('image'); // 'image' or 'camera'
  const [datasetMode, setDatasetMode] = useState('dataset'); // 'dataset' or 'scrapper'
  const [resultMode, setResultMode] = useState('show'); // 'show' or 'hide'
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadDataset, setUploadDataset] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState(false);
  const [isTexture, setIsTexture] = useState(true);
  const timecolor = dataColor['Elapsed Time'];
  const formattedtimecolor = parseFloat(timecolor).toFixed(3);
  const timetexture = dataTexture['Elapsed Time'];
  const formattedtimetexture = parseFloat(timetexture).toFixed(3);
  const numbercolor = dataColor['Number of Matches'];
  const numbertexture = dataTexture['Number of Matches'];
  
  const images = {};

  const handleSwitchChange = () => {
    setIsTexture((prev) => !prev);
  };

  const importAllImages = (context) => {
    context.keys().forEach((key) => {
      const imageName = key.replace('./', '').replace('.jpg', '');
      images[imageName] = context(key).default;
    });
  };


  const itemsPerPage = 12 

  const pageCount = Math.ceil((Object.keys(images)?.length || 0) / itemsPerPage);

  const displayedFiles = Object.keys(images)
    ? Object.keys(images).slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
      )
    : [];

    const handlePageClick = (data) => {
      setCurrentPage(data.selected);
    };

  const toggleUploadMode = () => {
    setUploadMode((prevMode) => (prevMode === 'image' ? 'camera' : 'image'));
  };

  const DatasetUploadMode = () => {
    setDatasetMode((prevMode) => (prevMode === 'dataset' ? 'scrapper' : 'dataset'));
  };

  const toggleResultMode = () => {
    setResultMode((prevMode) => (prevMode === 'show' ? 'hide' : 'show'));
  };


  const handleImageUpload = (image) => {
    // Logic to handle image upload and set it in state
    setUploadedImage(image);
  };

  // const images = [foto1, aland, ikhwan, qika];

  const searchHandler = () => {
    setSearch((prev) => !prev);
  }

  return (
    <section className='text-center flex flex-col items-center gap-y-4 pt-8'>
      <img src={Bg} className='w-full h-full top-0 fixed left-0 z-[-100] object-cover'/>
      <img src={logo} className='h-[150px] object-cover'/>    
      <h1 className='font-inter-bold text-4xl text-white mt-6'> Reverse Image Search </h1>
      <article className='flex w-[80%] gap-x-[100px] justify-center mt-10 items-center'>
      <div>
      <p className='font-inter-bold mt-7 text-2xl text-white text-left'>Image Preview</p>
      <div className='rounded my-2 w-[600px] h-[500px] relative 
          before:content-[""] before:absolute before:top-0 before:left-0 before:h-[100%] before:w-[100%] before:bg-gradient before:-z-1 before:rounded
          after:content-[""] after:absolute after:top-0 after:left-0 after:h-[100%] after:w-[100%] after:bg-gradient after:blur-[10px] after:-z-1 flex items-center justify-center after:rounded'>
            <div className='relative z-10 bg-primary rounded w-[99%] h-[99%] p-4 flex justify-center items-center text-white'>
            <img src={upload || icon} className='h-full w-full object-cover'/>  
            </div>
          </div>
      </div>
      <div className ='w-[400px]'>
       <p className='font-inter-bold mt-7 text-2xl text-white text-left'>Image Input</p>
       <div className='flex flex-col items-center'>
       <div className='rounded my-2 w-full h-full relative 
          before:content-[""] before:absolute before:top-0 before:left-0 before:h-[100%] before:w-[100%] before:bg-gradient before:-z-5 before:rounded
          after:content-[""] after:absolute after:top-0 after:left-0 after:h-[100%] after:w-[100%] after:bg-gradient after:blur-[10px] after:-z-1 flex items-center justify-center after:rounded'>
            <div className='relative z-10 bg-primary rounded w-[99.3%] h-[99%] pb-[50px] p-4 flex justify-center items-center text-white'>
              {uploadMode === 'image' ? (
                <ImageUploader/>
              ) : (
                <CameraUploader/>
              )}
            </div>
       </div>
        <div className='rounded my-[25px] w-[250px] h-[35px] relative 
          before:content-[""] before:absolute before:top-0 before:left-0 before:h-[100%] before:w-[100%] before:bg-gradient before:-z-1 before:rounded-[20px]
          after:content-[""] after:absolute after:top-0 after:left-0 after:h-[100%] after:w-[100%] after:bg-gradient after:blur-[20px] after:-z-1 flex items-center justify-center after:rounded-[15px]'>
        <button className={`font-inter-bold text-xl hover:scale-105 cursor-pointer transition-all text-white z-10 ${uploadMode === 'image'}`} onClick={toggleUploadMode}> 
        {uploadMode === 'image' ? 'Switch to Camera' : 'Switch to Image'}
      </button>
      </div>
      <div className="switch-container">
        <div className="switch-labels w-[250px] flex justify-between">
            <span className={`switch-left-label text-white font-inter ${isTexture ? 'active' : 'font-inter-bold'}`}>Color</span>
            <span className={`switch-right-label text-white font-inter ${isTexture ? 'font-inter-bold' : 'active'}`}>Texture</span>
        </div>
        <label className={`switch ${isTexture ? 'switch-left' : 'switch-right'}`}>
          <input type="checkbox" checked={isTexture} onChange={handleSwitchChange} />
          <span className="slider round"></span>
        </label>
      </div>
        <div
          className='rounded my-[25px] w-[175px] h-[35px] relative 
          before:content-[""] before:absolute before:top-0 before:left-0 before:h-[100%] before:w-[100%] before:bg-gradient before:-z-1 before:rounded-[20px]
          after:content-[""] after:absolute after:top-0 after:left-0 after:h-[100%] after:w-[100%] after:bg-gradient after:blur-[20px] after:-z-1 flex items-center justify-center after:rounded-[15px]'
        >
          <button className={`font-inter-bold text-xl hover:scale-105 cursor-pointer transition-all text-white z-10 ${ resultMode === 'show'}`}   onClick={() => {toggleResultMode(); searchHandler();}}> 
        {resultMode === 'show' ? 'Hide Result' : 'Show Result'}
      </button>
        </div>
        </div>
      </div>
      </article>
      <article className='w-[80%] flex flex-col justify-center items-center'>
       <div className="bg-white h-[2px] w-full"/>
       <div className=" flex flex-col relative h-fit w-full justify-between">
        <div className='flex justify-between items-center mt-4'>
        <div className='flex items-start h-[25px]'>
        <h2 className='font-inter-bold text-xl text-white h-fit'> Result : </h2>
       </div>
       <div>
       </div>
        </div>
        {search && (
          <div>
            <p className='font-inter text-xl text-white h-fit'> {isTexture ? numbertexture : numbercolor} results in {isTexture ? formattedtimetexture : formattedtimecolor} seconds</p>
            <MainPagination imageData={isTexture ? dataTexture : dataColor} />
          </div>
        )}


      </div>
       <div className="bg-white h-[2px] w-full mt-4"/>
       <div className='mt-8 mb-10 w-[250px] h-[35px] relative'>
       {datasetMode === 'dataset' ? (
               <DatasetUploader />
              ) : (
                <div className='translate-x-[-115px]'>
                <ImageScraper/>
                </div>
              )}
      <div className='rounded my-[25px] w-[250px] h-[35px] relative 
          before:content-[""] before:absolute before:top-0 before:left-0 before:h-[100%] before:w-[100%] before:bg-gradient before:-z-1 before:rounded-[20px]
          after:content-[""] after:absolute after:top-0 after:left-0 after:h-[100%] after:w-[100%] after:bg-gradient after:blur-[20px] after:-z-1 flex items-center justify-center after:rounded-[15px]'>
        <button className={`font-inter-bold text-xl hover:scale-105 cursor-pointer transition-all text-white z-10 ${datasetMode === 'dataset'}`} onClick={DatasetUploadMode}> 
        {datasetMode === 'dataset' ? 'Switch to Scrapper' : 'Switch to Dataset'}
      </button>
      </div>
      </div>
      <div className='h-[150px] w-full'/>
      </article>
    </section>
    
  )
}

export default Cbir