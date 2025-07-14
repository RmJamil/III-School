import { useContext, useState } from 'react';
import { useLoaderData, useParams } from 'react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import Rating from 'react-rating';
import { FaPlus, FaStar, FaRegStar } from 'react-icons/fa';

import Swal from 'sweetalert2';
import { AuthContext } from './AuthProvider';
import UseAxiosSecure from './useAxiosSecure';



const MyEnrolledClassDetails = () => {
  const enrolledClass=useLoaderData();
  console.log(enrolledClass);
  const { id: classId } = useParams();
  const axiosSecure = UseAxiosSecure();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();


  const [submissions, setSubmissions] = useState({});
  const [submittingIds, setSubmittingIds] = useState([]);
console.log(classId)

//   const { data: enrolled, isLoading } = useQuery({
//   queryKey: ['enrolled', classId, user?.email],
//   queryFn: async () => {
//     const res = await axiosSecure.get(`/paid/classes?email=${user?.email}&classId=${classId}`);
//     return res.data;
//   },
//   enabled: !!classId && !!user?.email,
// });

 const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);




    const { data: submittedAssignments = [], isLoading: submittedLoading } = useQuery({
    queryKey: ['submittedAssignments', user?.email, classId],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/assignments/submitted?email=${user?.email}&classId=${classId}`
      );
      return res.data;
    },
    enabled: !!user?.email && !!classId,
  });


  // Load assignments
  const { data: assignments = [], isLoading: assignmentsLoading } = useQuery({
    queryKey: ['assignments', classId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/class/assignment/${classId}`);
      return res.data;
    },
    enabled: !!classId,
  });


  const isPageLoading = assignmentsLoading || submittedLoading;
  // Load submitted assignments for this student

const isSubmitted = (assignmentId) =>
  submittedAssignments?.some((s) => s.assignmentId === assignmentId);


  const handleInputChange = (assignmentId, value) => {
    setSubmissions((prev) => ({ ...prev, [assignmentId]: value }));
  };

  const handleSubmit = async (assignmentId) => {
    const answer = submissions[assignmentId];
    if (!answer) {
      Swal.fire('Empty!', 'Please enter your answer before submitting.', 'warning');
      return;
    }

    try {
      setSubmittingIds((prev) => [...prev, assignmentId]);

      await axiosSecure.post(`/assignments/submit`, {
        assignmentId,
        classId,
        email: user?.email,
        submission: answer,
        submittedAt: new Date(),
      });

      Swal.fire('Submitted!', 'Your answer has been submitted.', 'success');
      setSubmissions((prev) => ({ ...prev, [assignmentId]: '' }));

      // refresh submitted state
      await queryClient.invalidateQueries(['submittedAssignments', user?.email, classId]);
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Submission failed.', 'error');
    } finally {
      setSubmittingIds((prev) => prev.filter((id) => id !== assignmentId));
    }
  };

  if (assignmentsLoading || submittedLoading) {
    return <p className="text-center py-10">Loading assignments...</p>;
  }

  const handleSend = async () => {
  const date = new Date().toISOString();

  const newRating = {
    description: feedback,
    rating,
    date,
    className:enrolledClass.title,
    classId,
    user_email:user?.email,
    user_name:user?.displayName
  };

  try {
    const res = await axiosSecure.post('/ratings', newRating);
    console.log('Rating added:', res.data);
        if (res.data?.insertedId) {
      // Success Alert
      Swal.fire({
        title: 'Success!',
        text: 'Your rating has been submitted.',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      // Reset states and close modal
      setShowModal(false);
      setFeedback('');
      setRating(0);
    }
  } catch (error) {
    console.error('Error submitting rating:', error);

    // Error Alert (optional)
    Swal.fire({
      title: 'Error!',
      text: 'Something went wrong. Please try again.',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }
};


  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className='p-6 bg-lime-500 flex justify-between'>
       <div>
         <div><span>Class Name :</span><span>{enrolledClass.title}</span></div>
     <div> <span>Instructor: <span>{enrolledClass.name}</span> </span></div>
       </div>
       <div>
        <button   onClick={() => setShowModal(true)} className='btn flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>   
          <FaPlus /> Teaching Evaluation Report (TER)</button>
       </div>
      </div>
      <h2 className="text-2xl font-bold mb-6 text-center">Assignments</h2>

      {assignments.length === 0 ? (
        <p className="text-center text-gray-500">No assignments found for this class.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border rounded-lg">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Deadline</th>
                <th>Submission</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment, index) => {
                const submitted = isSubmitted(assignment._id);
                const isSubmitting = submittingIds.includes(assignment._id);
                const inputValue = submissions[assignment._id] || '';

                return (
                  <tr key={assignment._id}>
                    <td>{index + 1}</td>
                    <td>{assignment.title}</td>
                    <td>{assignment.description}</td>
                    <td>{new Date(assignment.deadline).toLocaleDateString()}</td>
                    <td>
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) =>
                          handleInputChange(assignment._id, e.target.value)
                        }
                        className="input input-sm input-bordered w-full"
                        placeholder="Your answer"
                        disabled={submitted || isSubmitting}
                      />
                    </td>
  <td>
  {isPageLoading ? (
    <button className="btn btn-sm btn-disabled text-gray-400">Loading...</button>
  ) : isSubmitted(assignment._id) ? (
    <button className="btn btn-sm btn-disabled text-gray-500">Already Submitted</button>
  ) : (
    <button
      onClick={() => handleSubmit(assignment._id)}
      className="btn btn-sm btn-primary"
      disabled={isSubmitting || submitted}
    >
      {isSubmitting ? 'Submitting...' : 'Submit'}
    </button>
  )}
</td>


                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Your Feedback</h2>

            <textarea
              className="w-full border rounded p-2 mb-4 h-28"
              placeholder="Write your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />

            <div className="mb-4">
              <p className="mb-1 font-medium">Rate your experience:</p>
              <Rating
                initialRating={rating}
                onChange={(rate) => setRating(rate)}
                emptySymbol={<FaRegStar className="text-yellow-400 text-2xl" />}
                fullSymbol={<FaStar className="text-yellow-500 text-2xl" />}
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className=" btn px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                className="btn px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEnrolledClassDetails;
