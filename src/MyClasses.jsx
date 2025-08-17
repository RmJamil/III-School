import React, { useState, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from './AuthProvider';
import { Link } from 'react-router';
import Pagination from './Pagination'; // Make sure this exists

const MyClasses = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const { data: classes = [], isLoading } = useQuery({
    queryKey: ['my-classes', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/myclasses?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

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
      text: 'This will delete the class permanently!',
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = classes.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className='text-center p-5  rounded-2xl my-6'>
        <h2 className="text-3xl text-green-500 font-bold mb-4">Classes added by <span className='text-orange-500 italic'>{user?.displayName}</span> </h2>
      </div>

      {classes.length !== 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((classItem) => (
              <div key={classItem._id} className="card border shadow-xl ">
                <figure>
                  <img
                    src={classItem.image || '/default-class.jpg'}
                    alt={classItem.title}
                    className="h-52 w-full object-cover"
                  />
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
                      <button className="btn border border-green-500 hover:bg-green-600 hover:text-white">
                        Update
                      </button>
                    </Link>

                    <button
                      onClick={() => handleDelete(classItem._id)}
                      className="btn border border-red-500 hover:bg-red-600 hover:text-white"
                    >
                      Delete
                    </button>

                    <Link
                      to={`/dashboard/classprogress/${classItem._id}`}
                      className={`btn border border-blue-400 hover:bg-blue-400 hover:text-white ${
                        classItem.status === 'accepted' ? '' : 'btn-disabled'
                      }`}
                    >
                      See Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination below cards */}
          {classes.length > itemsPerPage && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalItems={classes.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      ) : (
        <p className="text-center lg:my-12 lg:text-6xl font-bold text-orange-600">
          You have not posted any classes yet!
        </p>
      )}
    </div>
  );
};

export default MyClasses;
