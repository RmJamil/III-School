import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OurTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axios.get('http://localhost:3000/teachers');
        setTeachers(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);
  console.log(teachers);

  if (loading) return <p>Loading teachers...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {teachers.map((teacher) => (
        <div
          key={teacher._id}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <img
            src={teacher.photo}
            alt={teacher.name}
            className="w-full  object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-bold">{teacher.name}</h3>
            <p className="text-gray-600">{teacher.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OurTeachers;
