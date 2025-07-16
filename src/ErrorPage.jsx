import React from 'react';

import Lottie from 'lottie-react';
import animationData from '../src/assets/404.json'
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
<div className='w-11/12 mx-auto'>

        
        <div className='flex flex-col h-[100vh] items-center gap-6  max-w-10/12 mx-auto'>
           
            <div className='flex flex-col items-center gap-24 bg-white w-full h-1/3 p-12 rounded-2xl mb-28'>
            <p className='text-6xl font-bold'>Invalid Page</p>
            <div className='w-1/5'>
             <div style={{ width: 300, height: 300 }}>
                  <Lottie animationData={animationData} loop={true} />
                </div>   
            </div>
            <Link to='/'> <button className='btn bg-sky-400 hover:bg-sky-500'>Back to home</button></Link>
    </div>
   
        </div>
</div>
       
    );
};

export default ErrorPage;