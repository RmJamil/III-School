import React, { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from './useAxiosSecure';
import Swal from 'sweetalert2';

import { AuthContext } from './AuthProvider';

const AddClass = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
   const [uploadedUrl, setUploadedUrl] = useState('');
    const [loading, setLoading] = useState(false);
  const { user } = use(AuthContext); // Get logged in user

  const onSubmit = async (data) => {
    const classData = {
      title: data.title,
      name: user.displayName,
      email: user.email,
      price: parseFloat(data.price),
      description: data.description,
      image: data.image,
      status: 'pending',
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post('/addclass', classData);
      if (res.data.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Class Added',
          text: 'Your class has been submitted for review.',
        });
      }
      reset();
    } catch (error) {
      console.error('Add class failed:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add class. Please try again.',
      });
    }
  };

  const handleImage = async (e) => {
  const formData = new FormData();
  formData.append("image", e.target.files[0]);
try{
   const res = await fetch("http://localhost:3000/api/upload", {
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
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Add New Class</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="label">Title</label>
          <input
            {...register('title', { required: true })}
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter class title"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="label">Name</label>
            <input
              type="text"
              value={user?.displayName || ''}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          <div className="flex-1">
            <label className="label">Email</label>
            <input
              type="email"
              value={user?.email || ''}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>
        </div>

        <div>
          <label className="label">Price</label>
          <input
            {...register('price', { required: true })}
            type="number"
            step="0.01"
            className="input input-bordered w-full"
            placeholder="Enter price"
          />
        </div>

        <div>
          <label className="label">Description</label>
          <textarea
            {...register('description', { required: true })}
            className="textarea textarea-bordered w-full"
            placeholder="Class description"
          ></textarea>
        </div>
        <div>
           <label className="label mr-3 text-lg">Upload photo:</label>
          <input className='file-input file-input-bordered w-full max-w-xs' type="file" onChange={handleImage} placeholder='Your photo' />
        </div>

   {loading && <p className="text-blue-600">Uploading...</p>}
         {uploadedUrl && (
        <div className="mt-4">
          <p className="text-sm text-green-600 my-1">Uploaded image:</p>
          <img
            src={uploadedUrl}
            alt="image"
            className="w-48 h-auto rounded border"
          />
        </div>
      )}

        <button type="submit" className="btn btn-primary mt-4">Add Class</button>
      </form>
    </div>
  );
};

export default AddClass;
