import React from 'react';

const Quick_tests = () => {
  const tests = [
    {
      name: 'Diabetes Prediction',
      model: 'Logistic Regression, Random Forest, Neural Networks',
      input: 'Age, BMI, glucose levels, insulin, blood pressure, family history',
      output: 'Probability of having diabetes',
    },
    {
      name: 'Heart Disease Prediction',
      model: 'Decision Trees, SVM, Deep Learning',
      input: 'Cholesterol, blood pressure, ECG results, age, gender, smoking history',
      output: 'Risk level (low, medium, high)',
    },
    {
      name: 'Lung Cancer Risk Prediction',
      model: 'CNN (for X-ray scans), Random Forest',
      input: 'Smoking habits, air pollution exposure, X-ray images',
      output: 'Probability of lung cancer',
    },
    {
      name: 'Breast Cancer Detection',
      model: 'CNN (for mammograms), SVM',
      input: 'Mammogram images, genetic history',
      output: 'Malignant/benign tumor classification',
    },
    {
      name: 'Pneumonia Detection',
      model: 'CNN',
      input: 'Chest X-ray images',
      output: 'Normal/Pneumonia presence',
    },
    {
      name: 'Alzheimer’s Disease Detection',
      model: 'Deep Learning, CNN (MRI scans)',
      input: 'MRI brain scans, cognitive test results',
      output: 'Stage of Alzheimer’s',
    },
    {
      name: 'Liver Disease Prediction',
      model: 'Random Forest, SVM',
      input: 'Bilirubin levels, enzyme levels, alcohol consumption',
      output: 'Presence/absence of liver disease',
    },
    {
      name: 'Chronic Kidney Disease Prediction',
      model: 'Decision Trees, KNN',
      input: 'Blood urea, creatinine, hemoglobin, age',
      output: 'CKD stage classification',
    },
    {
      name: 'COVID-19 Detection',
      model: 'CNN (Chest X-rays), Decision Trees',
      input: 'Chest X-rays, temperature, cough severity',
      output: 'COVID positive/negative',
    },
    {
      name: 'Malaria Detection',
      model: 'CNN',
      input: 'Blood smear images',
      output: 'Infected/normal',
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Online Medical Tests
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map((test, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {test.name}
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Model Type:</span> {test.model}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Input Data:</span> {test.input}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <span className="font-medium">Output:</span> {test.output}
            </p>
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300">
              Start Test
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quick_tests;