import React, { use } from 'react';
import Users from './Users';
import Navbar from './Navbar';
import './index.css';
import { NavLink, Outlet } from 'react-router';
import { FaBookOpen, FaChalkboard, FaChalkboardTeacher, FaCheckCircle, FaPlusCircle, FaUser, FaUserCircle, FaUserClock, FaUsers, FaUserTie } from 'react-icons/fa';
import { HiOutlineBriefcase } from 'react-icons/hi';
import useUserRole from './useUserRole';
import Footer from './Footer';
import { AuthContext } from './AuthProvider';

const DashboardLayout = () => {

   const { role, isRoleLoading } = useUserRole();
   const {user}=use(AuthContext);
  if (isRoleLoading){
    <div className='flex justify-center items-center'>
       return <span className="loading loading-bars loading-xl"></span>;
    </div>
  }
    return (
        <div className='mt-6'>
            <Navbar></Navbar>
            <div className='text-center hidden lg:block text-green-500 font-bold my-8 bg-blue-100 p-5 rounded-2xl'>
              <p className='text-3xl'>{user?.displayName}'s Dashboard </p>
              <p className='text-lg'>Role: <span className='text-orange-500 italic'>{role}</span></p>
            </div>
<div className="drawer lg:drawer-open ">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content ">
    {/* Page content here */}
   {/* Navbar */}
    <div className="navbar  w-full lg:hidden my-4">
      <div className="flex-none lg:hidden ">
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
<div className='  border border-green-500 min-h-full lg:ml-2  rounded-r-2xl rounded-l-lg p-2 lg:p-6'>
  <Outlet>

  </Outlet>
</div>
  </div>
  <div className="drawer-side border border-green-500 rounded-l-2xl  rounded-r-lg ">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu min-h-full rounded-r-2xl mt-56 lg:mt-0 w-44 lg:w-80 ">
      {/* Sidebar content here */}
      <p className='p-3 lg:text-xl font-bold text-green-600'>Dashboard</p>

      {/* <li>
  <NavLink
    to="/dashboard/teacherForm"
    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
  >
     <HiOutlineBriefcase />
    Apply as Teacher
  </NavLink>
</li> */}

{ !isRoleLoading && role==='admin' &&
  <>
  
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
        <NavLink to="/dashboard/users" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <FaUsers />
          Users
        </NavLink>
      </li>

       <li>
        <NavLink to="/dashboard/all-classes" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <FaChalkboardTeacher />
       All Classes to review
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




  </>


}


   { !isRoleLoading && role==='teacher' &&

   <>
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
  <NavLink
    to="/dashboard/profile"
    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
  >
    <FaUser />
    My Profile
  </NavLink>
</li>

   
   </>
   
}







  
{/*      
      <li>
  <NavLink
    to="/dashboard/approvedclasses"
    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
  >
    <FaCheckCircle />
   All Classes
  </NavLink>
</li> */}

 { !isRoleLoading && role==='student' &&
<>
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
</>
}

    </ul>
  </div>
</div>
       
   <div className='my-34 '>
        <Footer></Footer>
   </div>
        </div>
    );
};

export default DashboardLayout;