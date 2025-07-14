import React, { use } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';

import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from './AuthProvider';
import { Link } from 'react-router';


const MyClasses = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = use(AuthContext);
 

  // Fetch classes added by the logged-in teacher
  const { data: classes = [], isLoading } = useQuery({
    queryKey: ['my-classes', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myclasses?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/myclasses/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire('Deleted!', 'Your class has been deleted.', 'success');
      queryClient.invalidateQueries(['my-classes']);
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will delete the class permanently!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {
        isLoading && <span className="loading loading-bars loading-xl"></span>
      }
      <h2 className="text-2xl font-bold mb-4">My Classes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <div key={classItem._id} className="card bg-base-100 shadow-xl border">
            <figure>
              <img src={classItem.image || '/default-class.jpg'} alt={classItem.title} className="h-52 w-full object-cover" />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{classItem.title}</h3>
              <p><strong>Name:</strong> {classItem.name}</p>
              <p><strong>Email:</strong> {classItem.email}</p>
              <p><strong>Price:</strong> ${classItem.price}</p>
              <p><strong>Description:</strong> {classItem.description}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span className={`badge ${
                  classItem.status === 'pending' ? 'badge-warning' :
                  classItem.status === 'accepted' ? 'badge-success' :
                  'badge-error'
                }`}>
                  {classItem.status}
                </span>
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                <Link to={`/dashboard/updateclass/${classItem._id}`}>
                <button
            
                  className="btn btn-sm btn-outline btn-primary"
                >
                  Update
                </button>
                </Link>

                <button
                  onClick={() => handleDelete(classItem._id)}
                  className="btn btn-sm btn-outline btn-error"
                >
                  Delete
                </button>

                <Link
                  to={`/dashboard/my-class/${classItem._id}`}
                  className={`btn btn-sm btn-outline ${
                    classItem.status === 'accepted' ? 'btn-info' : 'btn-disabled'
                  }`}
                >
                  See Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Optional: Update modal here */}
     
    </div>
  );
};

export default MyClasses;
