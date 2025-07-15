import React, { use } from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router';
import { AuthContext } from './AuthProvider';

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
            </>
           }
        </div>
    );
};

export default RootLayout;