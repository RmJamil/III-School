import React from 'react';
import { useLoaderData } from 'react-router';
import  { useState } from 'react';
import { useForm } from 'react-hook-form';

import { FaPlus } from 'react-icons/fa';
import useAxiosSecure from './useAxiosSecure';
import Swal from 'sweetalert2';

const Progress = () => {
    const progressclass=useLoaderData();
    const [isModalOpen, setIsModalOpen] = useState(false);
   
    const classId=progressclass._id
     console.log(classId);
   const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const assignment = {
      ...data,
      classId,
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post('/assignments', assignment);
      if (res.data.insertedId) {
        Swal.fire('Success', 'Assignment added!', 'success');
        setIsModalOpen(false);
        reset();
      }
    } catch (err) {
      Swal.fire('Error', 'Failed to add assignment', err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Assignment Progress</h2>

      <button
        onClick={() => setIsModalOpen(true)}
        className="btn btn-primary flex items-center gap-2"
      >
        <FaPlus />
        Create
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-lg w-full relative">
            <h3 className="text-xl font-bold mb-4">Create Assignment</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="label">Assignment Title</label>
                <input
                  {...register('title', { required: true })}
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">Assignment Deadline</label>
                <input
                  type="date"
                  {...register('deadline', { required: true })}
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">Assignment Description</label>
                <textarea
                  {...register('description', { required: true })}
                  className="textarea textarea-bordered w-full"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2">
                <button type="submit" className="btn btn-success btn-sm">Add Assignment</button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-sm">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Progress;