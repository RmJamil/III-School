import React, { use } from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router';
import { AuthContext } from './AuthProvider';
import Footer from './Footer';

const RootLayout = () => {
    const {loading}=use(AuthContext);
    console.log(loading)
    return (
        <div className=' w-11/12 mx-auto mt-6'>
           {
            !loading &&
            <>
             <Navbar></Navbar>
         <div>
                
            <Outlet></Outlet>
         </div>
         <Footer></Footer>
            </>
           }
        </div>
    );
};

export default RootLayout;