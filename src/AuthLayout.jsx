import React, { use } from 'react';
import { Outlet } from 'react-router';
import Navbar from './Navbar';
import { AuthContext } from './AuthProvider';
import Footer from './Footer';

const AuthLayout = () => {
       const {loading}=use(AuthContext);
        console.log(loading)
    return (
        <div className='w-11/12 mx-auto mt-6'>
           {
            ! loading &&
            <>
             <Navbar></Navbar>
            <Outlet></Outlet>
            </>
           }

           {
            loading &&
            <div className='text-6xl'>Loading...</div>
           }
           <Footer></Footer>
        </div>
    );
};

export default AuthLayout;