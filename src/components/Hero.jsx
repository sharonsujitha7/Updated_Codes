import React from 'react';
import { useNavigate } from 'react-router-dom';
// import Typed from 'react-typed';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className='text-white bg-black'>
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
       
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
          Online Banking System
        </h1>
       
        <p className='md:text-2xl text-xl font-bold text-gray-500'>Get Started</p>
        <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black' onClick={() => navigate("/createAccount")}>Create Account</button>
      </div>
    </div>
  );
};

export default Hero;
