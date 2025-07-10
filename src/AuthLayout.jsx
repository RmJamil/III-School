import React, { use } from 'react';
import { Outlet } from 'react-router';
import Navbar from './Navbar';
import { AuthContext } from './AuthProvider';

const AuthLayout = () => {
       const {loading}=use(AuthContext);
        console.log(loading)
    return (
        <div>
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
        </div>
    );
};

export default AuthLayout;