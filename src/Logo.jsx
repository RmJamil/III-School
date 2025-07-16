import React from 'react';

import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to="/">
            <div className='flex items-end'>
                <img className='mb-2' src='https://i.postimg.cc/Z5FMvDFf/eee.jpg' alt="" />
                <p className='text-3xl -ml-2 font-extrabold'>III School</p>
            </div>
        </Link>
    );
};

export default Logo;