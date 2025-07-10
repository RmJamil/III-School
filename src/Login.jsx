import React, { use } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router';
import { AuthContext } from './AuthProvider';
import Swal from 'sweetalert2';

const Login = () => {
  const{signIn}=use(AuthContext)

    const {register,handleSubmit,formState:{errors}}=useForm();
  
    const onSubmit=data=>{
  console.log(data);

  signIn(data.email,data.password).then(result=>{
    console.log(result.user);
    
    Swal.fire({
      title: "Good job!",
      text: "successfully logged in!",
      icon: "success",
      timer:1500
    });
  }).catch(error=>{
    console.log(error);
      Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    
    });
  })

    }
    return (
    <div className="flex flex-col  min-h-screen justify-center items-center ">
        <div><p className='text-3xl font-bold m-4'>Please Log in</p></div>
  <div className="bg-sky-50 w-1/4 rounded-2xl ">

    <div className="card  w-full">
      
      <div className="card-body w-full">
       <form onSubmit={handleSubmit(onSubmit)}>
         <fieldset className="fieldset w-full">
           
          <label className="label">Email</label>
          <input type="email" {...register('email',{ required: "Email Address is required" })} className="p-2 text-lg bg-white text-black border-1 border-black" placeholder="Email" />
          {errors.email?.type==='required'&&
          <p className='text-lg text-red-500'>email is required</p> }
          <label className="label">Password</label>
          <input type="password" {...register('password',{required:true,minLength:6})} className="p-2 text-lg bg-white text-black border-1 border-black" placeholder="Password" />
                  {errors.password?.type==='required'&&
          <p className='text-lg text-red-500'>password is required</p> }
          {errors.password?.type==='minLength'&&
          <p className='text-lg text-red-500'>password must be atleast 6 character</p> }

          
          <button type='submit' className="btn bg-blue-400 mt-4">Sign in</button>

  
        </fieldset>
       </form>
               <button className="btn lg:mt-10 bg-white text-black border-[#e5e5e5]">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
</button>
        <div className='text-right'>Already have an acount? <span className='text-blue-500'><NavLink to='/register'>Sign up</NavLink></span></div>
      </div>
    </div>
  </div>
</div>
    );
};

export default Login;