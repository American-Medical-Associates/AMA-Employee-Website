import React, { useState, useEffect } from 'react';
import Header from '../components/navigation/Header';
import { useRouter } from 'next/router';
import { GetMadrs, auth } from '../firebase/firebase';

interface Submission {
  id: string;
  name: string;
  date: string;
}

const MadrsSubmissions = () => {
  const router = useRouter();
  const [madrs, setMadrs] = useState<Submission[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [submissionsPerPage] = useState(10);

  useEffect(() => {
    if (!auth.currentUser?.email) {
      router.push('/PatientLogin');
    }
  }, []);

  useEffect(() => {
    GetMadrs({ setMadrs: setMadrs });
  }, []);

  // Ordering and filtering submissions
  const orderedMadrs = madrs
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .filter(submission => submission.name.includes(searchTerm) || submission.date.includes(searchTerm));

  // Get current submissions
  const indexOfLastSubmission = currentPage * submissionsPerPage;
  const indexOfFirstSubmission = indexOfLastSubmission - submissionsPerPage;
  const currentSubmissions = orderedMadrs.slice(indexOfFirstSubmission, indexOfLastSubmission);

  // Change page
  const paginate = (pageNumber: React.SetStateAction<number>) => setCurrentPage(pageNumber);

  const handleSubmissionClick = (submissionId: string) => {
    router.push(`/MadrsSubDetails/${submissionId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Header selectCompany={"AMA"} routePatientsHome={true} />
      <div className="flex flex-col items-center justify-center mt-8">
        <h1 className="text-4xl text-blue-600 mb-4">MADRS Submissions</h1>
        <input 
          type="text" 
          placeholder="Search by name or date" 
          className="p-2 border-2 border-blue-300 rounded mb-6" 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div>
          {currentSubmissions.map((submission) => (
            <div 
              className="transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg p-6 mb-4 bg-gray-200 rounded cursor-pointer hover:bg-blue-500 hover:text-white" 
              key={submission.id} 
              onClick={() => handleSubmissionClick(submission.id)}
            >
              <p>{submission.name} - {submission.date}</p>
            </div>
          ))}
        </div>
        <div className="flex mt-4">
          {[...Array(Math.ceil(orderedMadrs.length / submissionsPerPage)).keys()].map((number) => (
            <button 
              key={number} 
              onClick={() => paginate(number + 1)}
              className={`px-3 py-1 mx-1 ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {number + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MadrsSubmissions;
