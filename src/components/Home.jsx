import React from 'react'
import Bg from'../assets/background-website.jpg'
import logo from '../assets/ga-reela-white-transparent.png'
import Cybereye from './Cybereye'

const Home = () => {
  return (
    <section className='text-center flex flex-col items-center gap-y-4 pt-8'>
      <img src={Bg} className='w-full h-full top-0 fixed left-0 z-[-100] object-cover'/>
      <img src={logo} className='h-[300px] object-cover'/>
      <h1 className='font-inter-bold text-4xl text-white mt-[65px]'>What is Ga-Reela?</h1>
      <h3 className='font-inter text-2xl text-white mx-[30px]'>Ga-Reela is a project that we designed in order to fulfill our second major assignment in the Linear Algebra and Geometry course. This project focuses on the implementation of Content Based Image Retrieval (CBIR) techniques.</h3>
      <article className='flex flex-col w-[80%] gap-x-4 justify-center mt-10 items-center'>
        <div className='rounded my-[50px] w-[90%] h-[550px] relative before:content-[""] before:absolute before:top-0 before:left-0 before:h-[100%] before:w-[100%] before:bg-gradient before:-z-1 before:rounded after:content-[""] after:absolute after:top-0 after:left-0 after:h-[100%] after:w-[100%] after:bg-gradient after:blur-[10px] after:-z-1 flex items-center justify-center after:rounded'>
            <div className='relative z-10 bg-primary rounded w-[99.9%] h-[99.9%] p-4 flex items-center flex-col text-white'>
            <div className='flex flex-col w-[90%]'>
                <h3 className='font-inter-bold text-3xl text-white'>Project Overview (CBIR)</h3>
                <div className='w-full text-justify '>
                <p className='font-inter text-l text-white mt-[50px] text-justify'>In the digital era, the number of images produced and stored is increasing rapidly, both in personal and professional contexts. This enhancement includes various types of images, from personal photos, medical images, scientific illustrations, to commercial images. Despite the diversity of sources and types of images, image retrieval systems become very relevant and important in facing this challenge. With the help of image retrieval system, users can easily search, access and manage their image collection. This system allows users to explore visual information stored on various platforms, whether in the form of personal image searches, medical image analysis for diagnosis, scientific illustration searches, to product searches based on commercial images. One example of implementing an image retrieval system that you may know is Google Lens.</p>
                <p className='font-inter text-l text-white mt-[20px] text-justify'>Content-Based Image Retrieval (CBIR) is a process used to search for and retrieve images based on their content. This process begins with the extraction of important features from the image, such as color, texture and shape. Once the features are extracted, they are represented in the form of vectors or numerical descriptions that can be compared with other images. Then, CBIR uses a matching algorithm to compare the feature vectors of the searched image with the feature vectors of images in the dataset. The results of this matching are used to sort the images in the dataset and display the images that are most similar to the image being searched for. The CBIR process helps users access and explore image collections in a more efficient way, because it does not require searching based on text or keywords, but rather based on the similarity of visual image values between the images.</p>
                </div>
            </div>
            </div>
        </div>
        <div className='rounded my-[50px] w-[90%] h-[650px] relative before:content-[""] before:absolute before:top-0 before:left-0 before:h-[100%] before:w-[100%] before:bg-gradient before:-z-1 before:rounded after:content-[""] after:absolute after:top-0 after:left-0 after:h-[100%] after:w-[100%] after:bg-gradient after:blur-[10px] after:-z-1 flex items-center justify-center after:rounded'>
            <div className='relative z-10 bg-primary rounded w-[99.9%] h-[99.9%] p-4 flex flex-col text-white'>
                <div className='flex items-start'>
                <h3 className='font-inter-bold text-3xl text-white mx-[30px]'>We Can See What You Can't See</h3>
                </div>
                <div className='flex flex-row justify-center'>
                  <div className='translate-x-[-100px]'>
                    <Cybereye/>
                  </div>
                  <div className='ml-[200px] text-left translate-x-[100px] w-[500px]'>
                  <h3 className='font-inter-bold text-xl text-white mt-[40px]'>Color Techniques</h3>
                  <p className='font-inter text-l text-white mt-[6px] text-justify'>A color histogram is the frequency of various colors in a certain color space. This is done to distribute the colors of the image. In histogram calculations, HSV global colors are preferred because these colors can be used on paper (white background) which is more commonly used. The RGB value must be normalized by changing the value range [0, 255] to [0, 1]. After getting the HSV value, compare the image from the input with the dataset using cosine similarity.</p>
                  <h3 className='font-inter-bold text-xl text-white mt-[30px]'>Texture Techniques</h3>
                  <p className='font-inter text-l text-white mt-[6px] text-justify'>CBIR with texture comparison is carried out using a matrix called the co-occurrence matrix. After obtaining the co-occurrence matrix, create a symmetric matrix by adding the co-occurrence matrix with the transpose results. Then look for the normalization matrix with the equation. From the co-occurrence matrix, 3 texture extraction components can be obtained, namely contrast, entropy and homogeneity. From these three components, a vector is created which will be used in the process of measuring the level of similarity. Measure the similarity of the two images using the Cosine Similarity Theorem.</p>
                  </div>
                </div>
              </div>
            </div>
      </article>    
    </section>
  )
}

export default Home