'use client'
import Image from 'next/image'
import Error from "../../../public/icons/error.png";
import React from 'react'

const error = ({error}: {error: Error}) => {
  console.log("Error",error);
  
  return (
      <div className='h-screen bg-gray-200 flex flex-col justify-center items-center'>
        <Image src={Error} alt='Error'/>
        <div className='bg-gray-200 px-9 py-5 shadow-md rounded'>
        <h3 className='text-3xl font-bold'>Ah! {error.message}</h3>
        <p className='mt-6 text-md font-light text-center'>404</p>
        </div>
    </div>
  )
}

export default error