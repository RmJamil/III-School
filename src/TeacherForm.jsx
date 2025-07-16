import React, { use } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from './useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import { AuthContext } from './AuthProvider';
import Swal from 'sweetalert2';


const TeacherForm = () => {
  const { user } =use(AuthContext) ; // Assuming user = { displayName, email, photoURL }
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutateAsync: submitRequest, isPending, isSuccess } = useMutation({
    mutationFn: async (formData) => {
      const res = await axiosSecure.post('/teacher-requests', formData);
      return res.data;
    },
    onSuccess: () => {
      reset();
       Swal.fire({
            title: "Good job!",
            text: "successfully posted your application!",
            icon: "success",
            timer:1500
          });

    },
  });

  const onSubmit = async (data) => {
    const payload = {
      name: user.displayName,
      email: user.email,
      image: user.photoURL,
      title: data.title,
      experience: data.experience,
      category: data.category,
      status: 'pending',
      submittedAt: new Date(),
    };
    await submitRequest(payload);
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">Apply for Teacher Position</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Name (auto-filled) */}
        <div>
          <label className="label">Name</label>
          <input
            type="text"
            defaultValue={user?.displayName || ''}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Email (auto-filled, read-only) */}
        <div>
          <label className="label">Email</label>
          <input
            type="email"
            defaultValue={user?.email || ''}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Image (auto-filled, hidden or preview only) */}
        <div>
          <label className="label">Profile Image</label>
          <img
            src={user?.photoURL}
            alt="Profile"
            className="w-16 h-16 rounded-full"
          />
        </div>

        {/* Title */}
        <div>
          <label className="label">Title</label>
          <input
            type="text"
            {...register('title', { required: true })}
            placeholder="Ex: Frontend Developer"
            className="input input-bordered w-full"
          />
          {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
        </div>

        {/* Experience */}
        <div>
          <label className="label">Experience Level</label>
          <select
            {...register('experience', { required: true })}
            className="select select-bordered w-full"
            defaultValue=""
          >
            <option value="" disabled>Select experience</option>
            <option value="beginner">Beginner</option>
            <option value="mid-level">Mid-level</option>
            <option value="experienced">Experienced</option>
          </select>
          {errors.experience && <p className="text-red-500 text-sm">Experience is required</p>}
        </div>

        {/* Category */}
        <div>
          <label className="label">Category</label>
          <select
            {...register('category', { required: true })}
            className="select select-bordered w-full"
            defaultValue=""
          >
            <option value="" disabled>Select category</option>
            <option value="web development">Web Development</option>
            <option value="digital marketing">Digital Marketing</option>
            <option value="graphic design">Graphic Design</option>
            <option value="data science">Data Science</option>
            <option value="ui/ux">UI/UX Design</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm">Category is required</p>}
        </div>

        {/* Submit Button */}
        <div>
          <button type="submit" className="btn bg-green-500 hover:bg-green-600 hover:text-white w-full" disabled={isPending}>
            {isPending ? 'Submitting...' : 'Submit for Review'}
          </button>
          {isSuccess && <p className="text-green-500 mt-2">Request submitted successfully!</p>}
        </div>
      </form>
    </div>
  );
};

export default TeacherForm;
