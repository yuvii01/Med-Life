import React from 'react';

const Doctor = () => {
  const doctors = [
    {
      id: 1,
      name: "Dr. Aisha Sharma",
      specialty: "Cardiologist",
      rating: 4.9,
      price: 1200,
      image: "https://randomuser.me/api/portraits/women/50.jpg",
    },
    {
      id: 2,
      name: "Dr. Rahul Verma",
      specialty: "Dermatologist",
      rating: 4.7,
      price: 1000,
      image: "https://randomuser.me/api/portraits/men/52.jpg",
    },
    {
      id: 3,
      name: "Dr. Priya Mehta",
      specialty: "Neurologist",
      rating: 4.8,
      price: 1500,
      image: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      id: 4,
      name: "Dr. Arjun Kapoor",
      specialty: "Orthopedic",
      rating: 4.6,
      price: 900,
      image: "https://randomuser.me/api/portraits/men/54.jpg",
    },
    {
      id: 5,
      name: "Dr. Neha Bansal",
      specialty: "Pediatrician",
      rating: 4.9,
      price: 1100,
      image: "https://randomuser.me/api/portraits/women/40.jpg",
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Our Doctors
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-200"
          >
            <div className="flex items-center mb-4">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-20 h-20 object-cover rounded-full mr-4"
              />
              <div>
                <h2 className="text-lg font-bold text-gray-800">{doctor.name}</h2>
                <p className="text-sm text-gray-500">{doctor.specialty}</p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Rating:</span> {doctor.rating} ⭐
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Price:</span> ₹{doctor.price}
              </p>
            </div>
            <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300">
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctor;