import React from 'react';
import Users from './Users';
import Navbar from './Navbar';
import './index.css';
import { NavLink, Outlet } from 'react-router';
import { FaBookOpen, FaChalkboard, FaChalkboardTeacher, FaCheckCircle, FaPlusCircle, FaUser, FaUserCircle, FaUserClock, FaUsers, FaUserTie } from 'react-icons/fa';

const DashboardLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
<div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Page content here */}
   {/* Navbar */}
    <div className="navbar bg-base-300 w-full lg:hidden">
      <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="mx-2 flex-1 px-2 lg:font-bold text-green-600">Dashboard</div>
  
    </div>
    {/* Page content here */}
<Outlet></Outlet>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 text-base-content min-h-full w-44 lg:w-80 p-4">
      {/* Sidebar content here */}
      <p className='p-3 lg:text-xl font-bold text-green-600'>Dashboard</p>
     <li>
        <NavLink to="/dashboard/teacher-request" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <FaUserTie />
          Teacher Request
        </NavLink>
      </li>

      <li>
  <NavLink
    to="/dashboard/pending-teachers"
    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
  >
    <FaUserClock />
    Pending Teachers
  </NavLink>
</li>
<li>
  <NavLink
    to="/dashboard/addclass"
    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
  >
    <FaPlusCircle />
    Add Class
  </NavLink>
</li>

<li>
  <NavLink
    to="/dashboard/my-classes"
    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
  >
    <FaChalkboard />
    My Classes
  </NavLink>
</li>



      <li>
        <NavLink to="/dashboard/users" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <FaUsers />
          Users
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/all-classes" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <FaChalkboardTeacher />
          All Classes
        </NavLink>
      </li>

      <li>
  <NavLink
    to="/dashboard/approvedclasses"
    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
  >
    <FaCheckCircle />
    Approved Classes
  </NavLink>
</li>



      <li>
  <NavLink to="/dashboard/enrolled-classes" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
    <FaBookOpen />
    My Enrolled Classes
  </NavLink>
</li>
<li>
  <NavLink
    to="/dashboard/profile"
    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
  >
    <FaUser />
    My Profile
  </NavLink>
</li>


    </ul>
  </div>
</div>
        </div>
    );
};

export default DashboardLayout;