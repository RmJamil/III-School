import React, { use } from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router';
import { AuthContext } from './AuthProvider';

const RootLayout = () => {
    const {loading}=use(AuthContext);
    console.log(loading)
    return (
        <div>
           {
            !loading &&
            <>
             <Navbar></Navbar>
            <Outlet></Outlet>
            </>
           }
        </div>
    );
};

export default RootLayout;