import React, { use } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { AuthContext } from './AuthProvider';
import Swal from 'sweetalert2';

const Navbar = () => {
  const{user,setUser,logout}=use(AuthContext);
  const navigate=useNavigate();
  console.log(user)

   const handleLogOut = () => {
      Swal.fire({
    title: 'Are you sure?',
    text: "You will be logged out!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'log out',
  }).then((result) => {
    if (result.isConfirmed) {
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
        }
  });
  
  };
    return (
        <div className='sticky top-0 z-50'>
            <div className="navbar  bg-slate-100 rounded-2xl flex justify-between shadow-sm my-4">
  <div className="flex items-center p-2">
    <img className='w-16 border-none rounded-full' src="https://i.postimg.cc/Z5FMvDFf/eee.jpg" alt="" />
    <a className="mx-4 lg:text-4xl font-bold text-green-600">III School</a>
  </div>
  <div className='flex gap-4 justify-center w-2/3'>
    <NavLink to='/'><button className='btn'>Home</button></NavLink>
    <NavLink to='/dashboard/all-classes'><button className='btn'>All Classes</button></NavLink>
     <NavLink to='/dashboard/teacherform'><button className='btn'>Teach on Tripl i Scool</button></NavLink>
  </div>
   <div>
    
  </div>
   <div>
   
  </div>
  <div className="flex gap-6 m-2">
   
   

    {
      user?(<>

         <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle w-16 avatar">
   
         <div className="rounded-full ">
          <img className=''
            alt="profile"
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
        <li><a onClick={handleLogOut}>Logout</a></li>
      </ul>
            <button onClick={handleLogOut} className='btn ml-5'>Log out</button>
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