import React, { use } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { AuthContext } from './AuthProvider';
import Swal from 'sweetalert2';

const Navbar = () => {
  const{user,setUser,logout}=use(AuthContext);
  const navigate=useNavigate();
  console.log(user)

   const handleLogOut = () => {
    logout().then(() => {
      setUser(null);
      navigate('/');
      Swal.fire({
        position: "center",
        icon: "success",
        title: "You Logged out",
        showConfirmButton: true,
        timer: 1300
      });
      navigate('/login');
    }).catch((error) => {
      console.log(error);
    });
  };
    return (
        <div>
            <div className="navbar bg-green-500 flex justify-between shadow-sm ">
  <div className="">
    <a className="btn btn-ghost lg:text-4xl font-bold text-green-600">Edu Manage</a>
  </div>
  <div>
    <NavLink to='/'><button className='btn'>Home</button></NavLink>
  </div>
  <div className="flex gap-2">
    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
   

    {
      user?(<>
      <button onClick={handleLogOut} className='btn'>Log out</button>
         <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
   
         <div className="w-10 rounded-full ">
          <img
            alt="profile picture"
            src={user?.photoURL} />
        </div>
   
        
      </div>
      
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-blue-100 rounded-box z-1 mt-3 w-70 p-2 shadow">
      
    
    <div className='flex justify-between lg:text-lg font-bold  border-b'>
          {user?.displayName}
            <span className="badge text-green-500  ">logged in</span>
    </div>
           
   
   
        <li className='font-bold'><NavLink to='/dashboard'>Dashboard</NavLink></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
      </>
       )
      :
      (
  <>
      <button className='btn'>   <NavLink to='/login'>Sign In</NavLink></button>
      <button className='btn'><NavLink to='/register'>Sign up</NavLink></button>
      </>
      )
    }
    

  </div>
</div>
        </div>
    );
};

export default Navbar;