import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { auth, db } from '../firebase/firebase'
import router from 'next/router'
import Header from '../components/navigation/Header'

interface Submission {
  id: string
  patientName: string
  dateOfBirth: string
  date: string
  submissionTime: string
}

function AimsSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [submissionsPerPage] = useState(10)

  useEffect(() => {
    if (!auth.currentUser?.email) {
      router.push('/PatientLogin')
    }
  }, [])

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, 'companys', 'AMA', 'AIMS'),
        )
        const submissionsData = querySnapshot.docs
          .map((doc) => ({
            ...(doc.data() as Submission),
          }))
          .sort(
            (a, b) =>
              new Date(b.submissionTime).getTime() -
              new Date(a.submissionTime).getTime(),
          )
        setSubmissions(submissionsData)
      } catch (error) {
        console.error('Error fetching submissions: ', error)
      }
    }

    fetchSubmissions()
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const filteredSubmissions = submissions.filter(
    (submission) =>
      submission.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.date.includes(searchTerm) ||
      submission.dateOfBirth.includes(searchTerm),
  )

  const indexOfLastSubmission = currentPage * submissionsPerPage
  const indexOfFirstSubmission = indexOfLastSubmission - submissionsPerPage
  const currentSubmissions = filteredSubmissions.slice(
    indexOfFirstSubmission,
    indexOfLastSubmission,
  )

  const pageNumbers = []
  for (
    let i = 1;
    i <= Math.ceil(filteredSubmissions.length / submissionsPerPage);
    i++
  ) {
    pageNumbers.push(i)
  }

  const handleRowClick = (submissionId: string) => {
    router.push(`/DynamicSubmissions/${submissionId}`)
  }

  return (
    <div>
      <Header selectCompany={'AMA'} routePatientsHome={true} />
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name, date, or date of birth"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 p-2">Patient Name</th>
                <th className="border border-gray-300 p-2">Date of Birth</th>
                <th className="border border-gray-300 p-2">Submission Date</th>
              </tr>
            </thead>
            <tbody>
              {currentSubmissions.map((submission) => (
                <tr
                  key={submission.id}
                  className="hover:bg-blue-500 hover:text-white cursor-pointer transition duration-300 ease-in-out"
                  onClick={() => handleRowClick(submission.id)}
                >
                  <td className="border border-gray-300 p-2">
                    {submission.patientName}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {submission.dateOfBirth}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {submission.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`px-3 py-1 border border-gray-300 mx-1 ${
                currentPage === number ? 'bg-blue-500 text-white' : ''
              }`}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AimsSubmissions
