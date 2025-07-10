import axios from 'axios';
import React, { use, useState } from 'react';

import { useForm } from 'react-hook-form';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { AuthContext } from './AuthProvider';
import Swal from 'sweetalert2';
import { GoogleAuthProvider } from 'firebase/auth';
import UseAxiosSecure from './UseAxiosSecure';

const Register = () => {
    const axiosSecure = UseAxiosSecure();
  const provider =new GoogleAuthProvider();
  const {user,createUser,updateUser,googleSignIn,setUser}=use(AuthContext);
  const [pic,setPic]=useState('')
  const [errMsg,setErrMsg]=useState('')
  const [errorMsg,setErrorMsg]=useState('')
  const {register,handleSubmit,formState:{errors}}=useForm();
  const location=useLocation();

   const navigate=useNavigate();
console.log(pic);

  const handleGoogle=()=>{
        googleSignIn(provider).then(result=>{
          const user=result.user;
          setUser(user);
          navigate(`${location.state? location.state :"/"}`);
            setErrMsg('');
setErrorMsg('');
          
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Congratulations!  you have successfully Logged in",
            showConfirmButton: true,
            timer: 3000
          });
        }).catch((error)=>{
          const errorMsg=error.message;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: errorMsg,
          
          });
          setUser('');
          // alert(errorMsg)
      })
    
      return;
    }


  const onSubmit=data=>{
console.log(data);
const passRegExp= /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
setErrMsg('');
setErrorMsg('');
if(passRegExp.test(data.password)===false){
setErrMsg('password should have atleast one or more number,uppercase and Lowercase letter')
return
}

  createUser(data.email,data.password).then(async(result)=>{
console.log(result.user);
const userProfile={
  displayName:data.name,photoURL:pic
}


console.log(userProfile)

 try {
      const newuser = {
        name: data.name,
        email: data.email,
        photo:pic,
        role: 'student', // optional default role
      };
console.log(newuser)
      const res = await axiosSecure.post('/users', newuser);
      console.log('User saved:', res.data);
    
   
    } catch (error) {
      console.error('Error creating user:', error);

    }
updateUser(userProfile).then(()=>{
console.log('profile name & pic updated',user?.displayName,user?.photoURL);

setErrMsg('');


Swal.fire({
  title: "Good job!",
  text: "Successfully created an account!",
  icon: "success",
  timer:1500
});
navigate('/');

})
  }
).catch((error=>{
  console.log(error);
  const err=error.message;
  setErrorMsg(err);
  Swal.fire({
  icon: "error",
  title: "Oops...",
  text: error.message,

});
}))


  }




  const handleImage=async(e)=>{
const image =e.target.files[0];
console.log(image);
const formData=new FormData();
formData.append('image',image);

const imguploadUrl=`https://api.imgbb.com/1/upload?&key=${import.meta.env.VITE_img_upload_key}`;
const res= await axios.post(imguploadUrl,formData);
console.log(res.data); 
setPic(res.data.data.url);
}
    return (
    <div className="flex flex-col min-h-screen justify-center items-center ">
        <div><p className='text-3xl font-bold m-4'>Please Register</p></div>
  <div className="bg-sky-50 w-1/4 rounded-2xl ">
  
    <div className="card  w-full">
      <div className="card-body w-full">
       <form onSubmit={handleSubmit(onSubmit)}>
         <fieldset className="fieldset w-full">
           <label className="label">Name</label>
           <input type="text" {...register('name',{ required: "Name is required" })} className="p-2 text-lg bg-white text-black border-1 border-black" placeholder="Your name" />
          {errors.name?.type==='required'&&
          <p className='text-lg text-red-500'>Name is required</p> }

          <label className="label">Upload photo</label>
          <input type="file" onChange={handleImage} placeholder='Your photo' />
          <label className="label">Email</label>
          <input type="email" {...register('email',{ required: "Email Address is required" })} className="p-2 text-lg bg-white text-black border-1 border-black" placeholder="Email" />
          {
           errorMsg && <p className='text-md text-red-500'>{errorMsg}</p>
          }
          {errors.email?.type==='required'&&
          <p className='text-lg text-red-500'>email is required</p> }
          <label className="label">Password</label>
          <input type="password" {...register('password',{required:true,minLength:6})} className="p-2 text-lg bg-white text-black border-1 border-black" placeholder="Password" />
                  
                  {errMsg && <p className='text-md text-red-500'>{errMsg}</p> }
                  {errors.password?.type==='required'&&
          <p className='text-lg text-red-500'>password is required</p> }
          {errors.password?.type==='minLength'&&
          <p className='text-lg text-red-500'>password must be atleast 6 character</p> }
          <button type='submit' className="btn bg-blue-400 mt-4">Sign up</button>

          
    
        </fieldset>
       </form>
             <button onClick={handleGoogle} className="btn lg:mt-10 bg-white text-black border-[#e5e5e5]">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
</button>
        <div className='text-right'>Already have an acount? <span className='text-blue-500'><NavLink to='/login'>Sign in</NavLink></span></div>
      </div>
    </div>
  </div>
</div>
    );
};

export default Register;