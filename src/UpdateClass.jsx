import React, { useState } from 'react';
import { useLoaderData, useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import useAxiosSecure from './useAxiosSecure';
import {  useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const UpdateClass = () => {
  const { classid } = useParams(); // Get classId from URL
   const classData = useLoaderData(); 
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  console.log(classid);
   const [uploadedUrl, setUploadedUrl] = useState(classData.image|| '');
     const [loading, setLoading] = useState(false);
     console.log(uploadedUrl)

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  // Fetch class data by ID
  // const { data: classData, isLoading } = useQuery({
  //   queryKey: ['class', classid],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get(`/updateclasses/${classid}`);
  //     return res.data;
  //   },
  //   enabled: !!classid,

  // });
  //  console.log(classData);
 
   
  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosSecure.patch(`/classes/${classid}`, updatedData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire('Success!', 'Class updated successfully.', 'success');
      queryClient.invalidateQueries(['class', classid]);
      reset();
    },
    onError: () => {
      Swal.fire('Error', 'Something went wrong!', 'error');
    },
  });

  const onSubmit = (data) => {
    updateMutation.mutate(data);
  };
  const handleImage = async (e) => {
  const formData = new FormData();
  formData.append("image", e.target.files[0]);
try{
   const res = await fetch("https://edu-manage-server-chi.vercel.app/api/upload", {
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



 


  // if (isLoading) return <p className="text-center py-10">Loading class data...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Update Class</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="label">Title</label>
          <input defaultValue={classData.title} {...register('title', { required: true })} className="input input-bordered w-full" />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="label">Name</label>
            <input
            value={classData.name}
              {...register('name')}

              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>
          <div className="flex-1">
            <label className="label">Email</label>
            <input
            value={classData.email}
              {...register('email')}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>
        </div>

        <div>
          <label className="label">Price</label>
          <input
          defaultValue={classData.price}
            type="number"
            step="0.01"
            {...register('price', { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label">Description</label>
          <textarea  defaultValue={classData.description} {...register('description')} className="textarea textarea-bordered w-full" />
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

        <div>
          <label className="label">Status</label>
          <input
          defaultValue={classData.status}
            {...register('status')}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        <button type="submit" disabled={isSubmitting} className="btn border border-green-500 hover:bg-green-600 hover:text-white">
          {isSubmitting ? 'Updating...' : 'Update'}
        </button>
      </form>
    </div>
  );
};

export default UpdateClass;
