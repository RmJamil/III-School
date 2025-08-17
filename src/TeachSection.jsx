import React from 'react';
import { NavLink } from 'react-router';
import BeatingButton from './BeatingButton';

const TeachSection = () => {
  return (
    <div>
      <div className="hero rounded-2xl  my-8 sm:my-12 py-10 sm:py-12">
        <div className="hero-content flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-24 px-4 sm:px-6">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-500">
              Become an Instructor!
            </h1>
            <p className="py-4 sm:py-6 text-orange-500 font-semibold text-base sm:text-lg md:text-2xl">
              Teaching is the one profession that creates all other professions.<br />
              Teaching isn’t just a profession—it’s the art of lighting a path where others
              can learn to walk on their own.
            </p>
            <NavLink to="/dashboard/teacherform">
              <BeatingButton text="Join Now" />
            </NavLink>
          </div>
          <img
            src="https://i.postimg.cc/XqZPWqFt/teee.jpg"
            className="w-64 sm:w-80 md:w-96 rounded-lg shadow-2xl"
            alt="Become an Instructor"
          />
        </div>
      </div>
    </div>
  );
};

export default TeachSection;
