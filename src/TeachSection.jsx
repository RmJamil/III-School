import React from 'react';
import { NavLink } from 'react-router';
import BeatingButton from './BeatingButton';

const TeachSection = () => {
    return (
        <div>
            <div className="hero bg-blue-50 my-12 py-12">
  <div className="hero-content flex-col gap-24 lg:flex-row">
    <img
      src="https://i.postimg.cc/XqZPWqFt/teee.jpg"
      className="max-w-sm rounded-lg shadow-2xl"
    />
    <div>
      <h1 className="text-5xl font-bold">Become an Instructor!</h1>
      <p className="py-6 text-orange-500 font-bold text-2xl">
        Teaching is the one profession that creates all other professions.<br/>
        Teaching isn’t just a profession—it’s the art of lighting a path where others
         can learn to walk on their own.
      </p>
      <NavLink to='/dashboard/teacherform'>    <BeatingButton text="Join Now"  /></NavLink>
    </div>
  </div>
</div>
        </div>
    );
};

export default TeachSection;