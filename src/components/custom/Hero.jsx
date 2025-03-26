import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
       <iframe src="/public/index.html" width="1000%" height="800px" title="HTML File" style={{ border: 'none' }}
  scrolling="no"className='border-none'/>
      <h1
      className='font-extrabold text-[50px] text-center mt-16'
      >
        <span className='text-[#f56551]'>Хиймэл оюуны хүчийг ашиглан </span> Аялалын төлөвлөгөөгөө гаргаарай</h1>
      <p className='text-xl text-gray-500 text-center'>Таны хувийн аялал төлөвлөгч, аялал жуулчлалын туслагч ,таны аялалыг илүү сонирхолтой болгоно, таны төсөв тохирсон тусгай маршрутыг бий болгодог.</p>
   
      <Link to={'/create-trip'}>
        <Button> Эхлэх </Button>
      </Link>

      <img src='/landing.png' className='' />
    </div>
  )
}

export default Hero