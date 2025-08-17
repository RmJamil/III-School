import React, { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { AuthContext } from './AuthProvider';
import Swal from 'sweetalert2';
import { GoogleAuthProvider } from 'firebase/auth';
import UseAxiosSecure from './useAxiosSecure';

const Register = () => {
  const axiosSecure = UseAxiosSecure();
  const provider = new GoogleAuthProvider();
  const { user, createUser, updateUser, googleSignIn, setUser } = use(AuthContext);

  const [errMsg, setErrMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogle = () => {
    googleSignIn(provider).then(result => {
      const user = result.user;
      setUser(user);
      navigate(`${location.state ? location.state : "/"}`);
      setErrMsg('');
      setErrorMsg('');

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Congratulations!  you have successfully Logged in",
        showConfirmButton: true,
        timer: 3000
      });
    }).catch((error) => {
      const errorMsg = error.message;
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMsg,
      });
      setUser('');
    });
  }

  const onSubmit = data => {
    console.log(data);
    const passRegExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    setErrMsg('');
    setErrorMsg('');
    if (passRegExp.test(data.password) === false) {
      setErrMsg('Password should have at least one number, uppercase and lowercase letter');
      return;
    }

    createUser(data.email, data.password).then(async (result) => {
      console.log(result.user);
      const userProfile = {
        displayName: data.name,
        photoURL: uploadedUrl
      };

      console.log(userProfile);

      try {
        const newuser = {
          name: data.name,
          email: data.email,
          photo: uploadedUrl,
          role: 'student',
        };
        console.log(newuser);
        const res = await axiosSecure.post('/users', newuser);
        console.log('User saved:', res.data);
      } catch (error) {
        console.error('Error creating user:', error);
      }

      updateUser(userProfile).then(() => {
        console.log('profile name & pic updated', user?.displayName, user?.photoURL);
        setErrMsg('');

        Swal.fire({
          title: "Good job!",
          text: "Successfully created an account!",
          icon: "success",
          timer: 1500
        });
        navigate('/');
      })
    }).catch((error => {
      console.log(error);
      const err = error.message;
      setErrorMsg(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }));
  }

  const handleImage = async (e) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await fetch("https://iii-school-server.vercel.app/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Uploaded image URL:", data.imageUrl);

      if (data.imageUrl) {
        setUploadedUrl(data.imageUrl);
      } else {
        alert('Upload failed.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('An error occurred while uploading.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen justify-center my-8 items-center px-4 bg-sky-50">
      <h1 className="text-3xl font-bold my-6 text-center">Please Register</h1>

      <div className="bg-white w-full max-w-md rounded-2xl shadow-md p-6 sm:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="label block text-lg font-semibold mb-1" htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              {...register('name', { required: "Name is required" })}
              className="w-full p-3 text-lg bg-white text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your name"
            />
            {errors.name && <p className="text-red-500 mt-1 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="label block text-lg font-semibold mb-1" htmlFor="photo">Upload photo</label>
            <input
              id="photo"
              className="file-input file-input-bordered w-full max-w-xs"
              type="file"
              onChange={handleImage}
              placeholder='Your photo'
            />
            {loading && <p className="text-blue-600 mt-2">Uploading...</p>}
            {uploadedUrl && (
              <div className="mt-4">
                <p className="text-sm text-green-600 mb-1">Uploaded image:</p>
                <img
                  src={uploadedUrl}
                  alt="Uploaded"
                  className="w-48 h-auto rounded border"
                />
              </div>
            )}
          </div>

          <div>
            <label className="label block text-lg font-semibold mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...register('email', { required: "Email Address is required" })}
              className="w-full p-3 text-lg bg-white text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Email"
            />
            {errorMsg && <p className='text-md text-red-500 mt-1'>{errorMsg}</p>}
            {errors.email && <p className="text-red-500 mt-1 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="label block text-lg font-semibold mb-1" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              {...register('password', { required: true, minLength: 6 })}
              className="w-full p-3 text-lg bg-white text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Password"
            />
            {errMsg && <p className='text-md text-red-500 mt-1'>{errMsg}</p>}
            {errors.password?.type === 'required' && <p className='text-red-500 mt-1 text-sm'>Password is required</p>}
            {errors.password?.type === 'minLength' && <p className='text-red-500 mt-1 text-sm'>Password must be at least 6 characters</p>}
          </div>

          <button type='submit' className="btn w-full bg-green-500 hover:bg-green-600 hover:text-white py-3 text-lg font-semibold rounded-md transition">
            Sign up
          </button>
        </form>

        <button
          onClick={handleGoogle}
          className="btn w-full mt-6 bg-white text-black border border-gray-300 flex items-center justify-center gap-2 py-3 rounded-md hover:bg-gray-100 transition"
        >
          <svg aria-label="Google logo" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="inline-block">
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
              <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
              <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
              <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
            </g>
          </svg>
          Login with Google
        </button>

        <p className='text-right mt-6 text-base'>
          Already have an account?{' '}
          <NavLink to='/auth/login' className='text-green-500 font-semibold hover:underline'>
            Sign in
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
