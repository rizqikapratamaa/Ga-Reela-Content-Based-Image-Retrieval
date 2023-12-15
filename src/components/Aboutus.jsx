import React from 'react'
import asistenLeon from '../assets/asistenLeon.jpg'
import qika from '../assets/qika.jpg'
import aland from '../assets/Aland.jpg'
import Ikhwan from '../assets/ikhwan.jpg'
import Bg from'../assets/background-website.jpg'
import PakRila from '../assets/rilamandala-d48f6.jpg'

const Aboutus = () => {
  const members = [
    {
      name: 'Aland Mulia Pratama',
      nim: '13522124',
      role: 'Frontend Developer',
      email: '13522124@std.stei.itb.ac.id',
      about: 'Deskripsi anggota 1.',
      image: aland,
    },
    {
      name: 'Rizqika Mulia Pratama',
      nim: '13522126',
      role: 'Backend Developer',
      email: '13522126@std.stei.itb.ac.id',
      about: 'Deskripsi anggota 2.',
      image: qika,
    },
    {
      name: 'Ikhwan Al Hakim',
      nim: '13522147',
      role: 'Texture and Color Function',
      email: '13522147@std.stei.itb.ac.id',
      about: 'Deskripsi anggota 3.',
      image: Ikhwan,
    },
  ];

  return (
    <section className='text-center flex flex-col items-center gap-y-4 pt-8'>
      <img src={Bg} className='w-full h-full top-0 fixed left-0 z-[-100] object-cover'/>
      <h1 className='font-inter-bold text-3xl text-white'>GA-REELA CONTRIBUTORS</h1>
      <h3 className='font-inter text-xl text-white'>The main objective from the major assignment of Linear Algebra and Geometry courses is to analyze images in matrix representation based on color and texture parameters.</h3>
      <article className='flex w-[80%] gap-x-4 justify-center mt-10'>
        {members.map((items) => {
          return (
          <div className='rounded my-2 w-[300px] h-[350px] relative 
          before:content-[""] before:absolute before:top-0 before:left-0 before:h-[100%] before:w-[100%] before:bg-gradient before:-z-1 before:rounded
          after:content-[""] after:absolute after:top-0 after:left-0 after:h-[100%] after:w-[100%] after:bg-gradient after:blur-[10px] after:-z-1 flex items-center justify-center after:rounded'>
            <div className='relative z-10 bg-primary rounded w-[99%] h-[99%] p-4 flex items-center flex-col text-white'>
              <img src={items.image} className='h-[150px] w-[150px] rounded-full object-cover'/>
              <p className='font-inter-bold mt-7'>{items.name}</p>
              <p className='font-inter'>{items.nim}</p>
              <p className='font-inter italic'>{items.role}</p>
              <p className='font-inter'>({items.email})</p>
            </div>
          </div>
          )
        })}
      </article> 
      <article className='flex flex-col mt-10 items-center w-full'>
      <h1 className='font-inter-bold text-3xl text-white'>SPECIAL THANKS</h1>
      <h3 className='font-inter text-xl text-white'>With passion and dedication they have contributed significantly in developing this project, bringing our vision to reality.</h3>
        <div className='rounded my-10 w-[300px] h-[350px] relative 
        before:content-[""] before:absolute before:top-0 before:left-0 before:h-[100%] before:w-[100%] before:bg-gradient before:-z-1 before:rounded
        after:content-[""] after:absolute after:top-0 after:left-0 after:h-[100%] after:w-[100%] after:bg-gradient after:blur-[10px] after:-z-1 flex items-center justify-center after:rounded
        '>
          <div className='relative z-10 bg-primary rounded w-[99%] h-[99%] p-4 flex items-center flex-col text-white'>
            <h2 className='font-inter-bold text-2xl'>Lecturer</h2>
            <h3 className='font-inter text-l'>Linear Algebra and Geometry</h3>
            <img src={PakRila} className='h-[150px] w-[150px] rounded-full object-cover mt-8'/>
            <p className='font-inter-bold mt-7'>Ir. Rila Mandala, M.Eng., Ph.D.</p>

          </div>
        </div>
        <div className='rounded my-2 w-[300px] h-[350px] relative 
        before:content-[""] before:absolute before:top-0 before:left-0 before:h-[100%] before:w-[100%] before:bg-gradient before:-z-1 before:rounded
        after:content-[""] after:absolute after:top-0 after:left-0 after:h-[100%] after:w-[100%] after:bg-gradient after:blur-[10px] after:-z-1 flex items-center justify-center after:rounded mb-5'>
          <div className='relative z-10 bg-primary rounded w-[99%] h-[99%] p-4 flex items-center flex-col text-white '>
          <h2 className='font-inter-bold text-2xl'>Project Assistant</h2>
          <h3 className='font-inter text-l'>IRK Lab Assistance</h3>
          <img src={asistenLeon} className='h-[150px] w-[150px] rounded-full object-cover mt-8'/>
          <p className='font-inter-bold mt-4'>Michael Leon Putra Widhi</p>
          <p className='font-inter'>13521108</p>
          </div>
        </div>
      </article>
    </section>

  )
}

export default Aboutus