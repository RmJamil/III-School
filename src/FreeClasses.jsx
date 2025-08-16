import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FreeClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFreeClasses = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/free-classes');
        setClasses(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFreeClasses();
  }, []);

  if (loading) return <p>Loading free classes...</p>;

  if (classes.length === 0) return <p>No free classes available.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {classes.map((cls) => (
        <div
          key={cls._id}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <img
            src={cls.image}
            alt={cls.title}
            className="w-full h-56 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-bold">{cls.title}</h3>
            <p className="text-gray-600 mb-2">{cls.description}</p>
            <p className="text-sm text-gray-500">Instructor: {cls.name}</p>
            <p className="text-sm text-gray-500">Email: {cls.email}</p>
              <p className="text-sm font-semibold mt-2">
    Price: <span className="line-through text-gray-400">${cls.price}</span>{' '}
    <span className="text-green-600 font-bold ml-2">$0</span>
  </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FreeClasses;
