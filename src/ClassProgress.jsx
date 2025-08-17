import { use, useState } from 'react';
import { useParams } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';

import { FaPlus, FaUserGraduate, FaTasks, FaClipboardCheck } from 'react-icons/fa';
import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from './AuthProvider';

const ClassProgress = () => {
  const { id: classId } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
 const{user}=use(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    deadline: '',
    description: '',
  });

  // --- Fetch stats ---
  const { data: stats = {} } = useQuery({
    queryKey: ['class-progress', classId],
    queryFn: async () => {
      const [enrollRes, assignRes, subRes] = await Promise.all([
        axiosSecure.get(`/progress/enrollments/${classId}`),
        axiosSecure.get(`/progress/assignments/${classId}`),
        axiosSecure.get(`/progress/submissions/${classId}`),
      ]);

      return {
        totalEnrollment: enrollRes.data.count,
        totalAssignments: assignRes.data.count,
        totalSubmissions: subRes.data.count,
      };
    },
    enabled: !!classId,
  });

  // --- Create assignment mutation ---
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.post('/assignments', {
        ...formData,
        classId,
        Teacher:user.displayName,
        Teacher_email:user.email,
        createdAt:new Date()
      });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire('Success', 'Assignment created successfully!', 'success');
      setFormData({ title: '', deadline: '', description: '' });
      setIsModalOpen(false);
      queryClient.invalidateQueries(['class-progress', classId]);
    },
    onError: () => {
      Swal.fire('Error', 'Failed to create assignment.', 'error');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <section className="max-w-6xl mx-auto p-6 space-y-10">
         {/* Add Assignment Section */}
      <div className='flex justify-end rounded-2xl items-center p-6'>
        <button onClick={() => setIsModalOpen(true)} className="btn  bg-green-500 hover:bg-green-600 hover:text-white">
          <FaPlus className="mr-2" />
          Create Assignment
        </button>
      </div>

      <h2 className="text-3xl font-bold">Class Progress</h2>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border">
        <div className=" shadow-md p-6 rounded-lg flex items-center gap-4">
          <FaUserGraduate className="text-4xl text-blue-500" />
          <div>
            <p className="text-lg font-semibold">Total Enrollment</p>
            <p className="text-2xl">{stats.totalEnrollment || 0}</p>
          </div>
        </div>

        <div className=" shadow-md p-6 rounded-lg flex items-center gap-4">
          <FaTasks className="text-4xl text-green-500" />
          <div>
            <p className="text-lg font-semibold">Total Assignments</p>
            <p className="text-2xl">{stats.totalAssignments || 0}</p>
          </div>
        </div>

        <div className="shadow-md p-6 rounded-lg flex items-center gap-4">
          <FaClipboardCheck className="text-4xl text-purple-500" />
          <div>
            <p className="text-lg font-semibold">Total Submissions</p>
            <p className="text-2xl">{stats.totalSubmissions || 0}</p>
          </div>
        </div>
      </div>

 

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="border p-6 rounded-md w-[90%] max-w-lg">
            <h3 className="text-xl font-bold mb-4">Create Assignment</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                required
                placeholder="Assignment Title"
                className="input text-black  input-bordered w-full"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              <input
                type="date"
                required
                className="input text-black input-bordered w-full"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              />
              <textarea
                required
                placeholder="Description"
                className="textarea textarea-bordered text-black  w-full"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="border-2 border-red-500 py-1 px-2 rounded-lg cursor-pointer hover:bg-red-500 hover:text-white"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="border-2 border-green-500 py-1 px-2 rounded-lg cursor-pointer hover:bg-green-500 hover:text-white">
                  Add Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default ClassProgress;
