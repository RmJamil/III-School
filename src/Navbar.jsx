import React, { useRef, useState, useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { AuthContext } from './AuthProvider';
import Swal from 'sweetalert2';
import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md';

const Navbar = () => {
  const { user, setUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const dropdownRef = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 🔥 Toggle for mobile menu

 const [dark, setDark] = useState(true);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDark(savedMode === 'true');
    }
  }, []);

  // Apply dark mode class & save to localStorage
  useEffect(() => {
    if (dark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', dark);
  }, [dark]);

  const handleDark = () => {
    setDark((prev) => !prev);
  };


  const closeDropdown = () => {
    if (dropdownRef.current) {
      dropdownRef.current.blur();
    }
  };

  const handleLogOut = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Log out',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/');
        logout()
          .then(() => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'You Logged out',
              showConfirmButton: true,
              timer: 1300,
            });
            setUser(null);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return (
    <div className="sticky top-0 z-50 bg-blue-200 rounded-2xl shadow-sm  lg:px-16 py-2">
      <div className="navbar flex justify-between items-center p-4">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <img className="w-12 rounded-full" src="https://i.postimg.cc/Z5FMvDFf/eee.jpg" alt="logo" />
          <span className="text-xl lg:text-4xl font-bold text-green-600">III School</span>
        </div>

        {/* Hamburger menu button for mobile */}
        <div className="lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="btn btn-ghost text-green-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-4 justify-center w-2/3">
          <NavLink to='/'><button className='btn bg-green-500 hover:bg-green-600 hover:text-white'>Home</button></NavLink>
          <NavLink to='/ourTeachers'><button className='btn bg-green-500 hover:bg-green-600 hover:text-white'>Our Teachers</button></NavLink>
          <NavLink to='/freeClasses'><button className='btn bg-green-500 hover:bg-green-600 hover:text-white'>Free Classes</button></NavLink>

          { user &&
            <>
            <NavLink to='/dashboard/approvedclasses'><button className='btn bg-green-500 hover:bg-green-600 hover:text-white'>All Classes</button></NavLink>
          <NavLink to='/dashboard/teacherform'><button className='btn bg-green-500 hover:bg-green-600 hover:text-white'>Teach on Triple i School</button></NavLink>
            </>
          }
        </div>

        {/* Auth Section */}
        <div className="hidden lg:flex gap-4 items-center">
          {user ? (
            <>
              {/* Avatar Dropdown */}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  ref={dropdownRef}
                  role="button"
                  className="btn btn-ghost btn-circle w-16 avatar"
                >
                  <div className="rounded-full">
                    <img alt="profile" src={user?.photoURL} />
                  </div>
                </div>

                <ul tabIndex={0} className="menu menu-sm dropdown-content bg-blue-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                  <div className="flex justify-between font-bold border-b pb-1">
                    {user?.displayName}
                    <span className="badge text-green-500">logged in</span>
                  </div>
                  <li className="font-bold">
                    <NavLink to="/dashboard" onClick={closeDropdown}>Dashboard</NavLink>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleLogOut();
                        closeDropdown();
                      }}
                    >Logout</button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <NavLink to='/auth/login'>
                <button className='btn bg-green-500 hover:bg-green-600 hover:text-white'>Sign In</button>
              </NavLink>
         
            </>
          )}
           {dark ? <MdDarkMode className='ml-4 cursor-pointer p-1 hover:p-0' onClick={handleDark} size={40} /> : <MdOutlineDarkMode className='ml-4 cursor-pointer  p-1 hover:p-0' onClick={handleDark} size={40} />}
        </div>
        
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
           

        <div className="lg:hidden flex flex-col gap-2 px-4 pb-4">
           {dark ? <MdDarkMode className='ml-4 cursor-pointer p-1 hover:p-0' onClick={handleDark} size={40} /> : <MdOutlineDarkMode className='ml-4 cursor-pointer  p-1 hover:p-0' onClick={handleDark} size={40} />}
          <NavLink to='/' onClick={() => setIsMenuOpen(false)}><button className='btn w-full'>Home</button></NavLink>
          <NavLink to='/ourTeachers'><button className='btn w-full'>Our Teachers</button></NavLink>
          <NavLink to='/freeClasses'><button className='btn w-full'>Free Classes</button></NavLink>

        {user ? (
            <>
               <NavLink to='/dashboard/approvedclasses' onClick={() => setIsMenuOpen(false)}><button className='btn w-full'>All Classes</button></NavLink>
          <NavLink to='/dashboard/teacherform' onClick={() => setIsMenuOpen(false)}><button className='btn w-full'>Teach on Triple i School</button></NavLink>
               <NavLink className='btn w-full text-green-600' to="/dashboard" onClick={closeDropdown}>Dashboard</NavLink>
              <button onClick={() => { handleLogOut(); setIsMenuOpen(false); }} className='btn w-full bg-red-500 text-white'>
                Log Out
              </button>
            </>
          ) : (
            <>
              <NavLink to='/auth/login' onClick={() => setIsMenuOpen(false)}>
                <button className='btn w-full bg-green-500 text-white'>Sign In</button>
              </NavLink>
            
            </>
          )}


          

  
        </div>
      )}
    </div>
  );
};

export default Navbar;
