import React, { use } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router';
import { AuthContext } from './AuthProvider';
import Swal from 'sweetalert2';

const Login = () => {
  const { signIn } = use(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    signIn(data.email, data.password)
      .then((result) => {
        console.log(result.user);

        Swal.fire({
          title: 'Good job!',
          text: 'successfully logged in!',
          icon: 'success',
          timer: 1500,
        });
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        });
      });
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center px-4 bg-sky-50">
      <h1 className="text-3xl font-bold my-6 text-center">Please Log in</h1>

      <div className="bg-white w-full max-w-md rounded-2xl shadow-md p-6 sm:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="label block text-lg font-semibold mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email', { required: 'Email Address is required' })}
              className="w-full p-3 text-lg bg-white text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 mt-1 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="label block text-lg font-semibold mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              className="w-full p-3 text-lg bg-white text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500 mt-1 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full btn bg-green-500 hover:bg-green-600 hover:text-white py-3 text-lg font-semibold rounded-md transition"
          >
            Sign in
          </button>
        </form>

        <button className="btn w-full mt-6 bg-white text-black border border-gray-300 flex items-center justify-center gap-2 py-3 rounded-md hover:bg-gray-100 transition">
          <svg
            aria-label="Google logo"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="inline-block"
          >
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

        <p className="text-right mt-6 text-base">
          Don't have an account?{' '}
          <NavLink to="/auth/register" className="text-green-500 font-semibold hover:underline">
            Sign up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
