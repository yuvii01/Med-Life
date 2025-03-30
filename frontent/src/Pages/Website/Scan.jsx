import React, { useState } from 'react';

const Scan = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const[isFile , setIsFile] = useState(false)


  const medicineData = [
    {
      name: "Crocin",
      qty: 1,
      description: "sknvs",
      date: "2025-03-29",
      timing: "16:31",
    },
    {
      name: "Paracetamol",
      qty: 1,
      description: "aaaaaa",
      date: "2025-03-29",
      timing: "13:24",
    },
    {
      name: "Dolo G",
      qty: 1,
      description: "aaaaaaaa",
      date: "2025-03-29",
      timing: "21:30",
    },
  ];


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      setUploadStatus('Please select a file to upload.');
      return;
    }

    setIsFile(true) ;
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Prescription</h1>
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button onClick={handleFileUpload} className="bg-blue-500 text-white px-4 py-2 rounded">
        Upload
      </button>
      {isFile ? 
        medicineData.map((medicine, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">{medicine.name}</h3>
            <p className="text-sm text-gray-600">Quantity: {medicine.qty}</p>
            <p className="text-sm text-gray-600">Description: {medicine.description}</p>
            <p className="text-sm text-gray-600">Date: {medicine.date}</p>
            <p className="text-sm text-gray-600">Timing: {medicine.timing}</p>
          </div>
        ))
      : <div className="mt-4">Please upload a file</div>}
    </div>
  );
};

export default Scan;