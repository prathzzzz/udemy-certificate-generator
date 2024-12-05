import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import GoogleAd from './GoogleAd'; // Add this import

const generateRandomId = () => {
  return 'UC-' + Array.from({ length: 4 }, () => 
    Math.random().toString(36).substring(2, 7)
  ).join('-');
};

const CertificateGenerator = () => {
  const [formData, setFormData] = useState({
    courseName: '',
    instructorName: '',
    studentName: '',
    date: null,
    length: '',
    certificateId: generateRandomId(), // Initialize with a random ID
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date: date });
  };

  const generateCertificate = async () => {
    const certificate = document.getElementById('certificate');
    const canvas = await html2canvas(certificate, { scale: 2 });
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'udemy_certificate.png';
    link.click();
  };

  const formatDate = (date) => {
    if (!date) return '';
    
    const monthNames = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.",
                        "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
    
    return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-8">
          Udemy Certificate Generator
        </h1>
        
        {/* Add the Google Ad component here
        <div className="mb-6">
          <GoogleAd slot="5643685906" />
        </div>
         */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
          {/* Form Section */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4 sm:mb-6">
                Certificate Details
              </h2>
              <form className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Course Name</label>
                  <input
                    type="text"
                    name="courseName"
                    placeholder="Enter course name"
                    value={formData.courseName}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Instructor Name</label>
                  <input
                    type="text"
                    name="instructorName"
                    placeholder="Enter instructor name"
                    value={formData.instructorName}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Student Name</label>
                  <input
                    type="text"
                    name="studentName"
                    placeholder="Enter student name"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Completion Date</label>
                  <DatePicker
                    selected={formData.date}
                    onChange={handleDateChange}
                    dateFormat="dd-MM-yyyy"
                    placeholderText="Select completion date"
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Course Length (hours)</label>
                  <input
                    type="number"
                    name="length"
                    placeholder="Enter course length"
                    value={formData.length}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  />
                </div>

                <button
                  type="button"
                  onClick={generateCertificate}
                  className="w-full bg-purple-600 text-white py-2.5 rounded-lg font-medium hover:bg-purple-700 transform transition hover:scale-[1.02] active:scale-[0.98] shadow-md"
                >
                  Generate Certificate
                </button>
              </form>
            </div>
          </div>

          {/* Certificate Preview Section */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4 sm:mb-6">
                Certificate Preview
              </h2>
              <div className="overflow-x-auto">
                <div className="min-w-[800px]"> {/* Minimum width to prevent certificate from becoming too small */}
                  <div id="certificate" className="bg-gray-100 p-6 sm:p-8 rounded-lg shadow-lg font-sans">
                    <div className="flex justify-between items-start mb-12 sm:mb-16">
                      <img 
                        src="/udemy-logo.png" 
                        alt="Udemy Logo" 
                        className="w-36 sm:w-48 h-auto bg-transparent mix-blend-multiply" 
                      />
                      <div className="text-right text-tiny sm:text-xs text-gray-500">
                        <p>Certificate no: {formData.certificateId}</p>
                        <p>Certificate url: ude.my/{formData.certificateId}</p>
                        <p>Reference Number: {Math.floor(Math.random() * 9000) + 1000}</p>
                      </div>
                    </div>
                    <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4 sm:mb-6 text-gray-600">
                      Certificate of Completion
                    </h2>
                    <h1 className="text-3xl sm:text-4xl font-prima-sans-bold mb-4">
                      {formData.courseName || 'Machine Learning Essentials - Master core ML concepts'}
                    </h1>
                    <p className="mb-32 sm:mb-44">
                      <span className="font-normal">Instructors:</span>{' '}
                      <span className="font-prima-sans-bold">{formData.instructorName || 'Mohit Uniyal, Prateek Narang'}</span>
                    </p>
                    <h3 className="text-3xl sm:text-4xl font-prima-sans-bold mb-2">
                      {formData.studentName || 'Pratham Karia'}
                    </h3>
                    <div className="text-xs sm:text-sm">
                      <p>
                        <span className="font-normal mr-1">Date</span>{' '}
                        <span className="font-bold">{formatDate(formData.date) || 'Oct. 6, 2024'}</span>
                      </p>
                      <p>
                        <span className="font-normal mr-1">Length</span>{' '}
                        <span className="font-bold">{formData.length ? `${formData.length} total hours` : '28 total hours'}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateGenerator;
