import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { GetPhq, auth } from '../firebase/firebase'

interface Submission {
  id: string
  name: string
  date: string
}

const PhqSubmissions = () => {
  const router = useRouter()
  const [phq, setPhq] = useState<Submission[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [submissionsPerPage] = useState(10)

  useEffect(() => {
    if (!auth.currentUser?.email) {
      router.push('/PatientLogin')
    }
  }, [])

  useEffect(() => {
    GetPhq({ setPhq: setPhq })
  }, [])

  // Ordering and filtering submissions
  const orderedPhq = phq
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .filter(
      (submission) =>
        submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.date.includes(searchTerm),
    )

  // Get current submissions
  const indexOfLastSubmission = currentPage * submissionsPerPage
  const indexOfFirstSubmission = indexOfLastSubmission - submissionsPerPage
  const currentSubmissions = orderedPhq.slice(
    indexOfFirstSubmission,
    indexOfLastSubmission,
  )

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const handleSubmissionClick = (submissionId: string) => {
    router.push(`/DynamicPhq/${submissionId}`)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or date"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="w-1/2 border border-gray-300 p-2">Name</th>
              <th className="w-1/2 border border-gray-300 p-2">
                Date Submitted
              </th>
            </tr>
          </thead>
          <tbody>
            {currentSubmissions.map((submission) => (
              <tr
                key={submission.id}
                onClick={() => handleSubmissionClick(submission.id)}
                className="hover:bg-blue-500 hover:text-white cursor-pointer transition duration-300 ease-in-out"
              >
                <td className="w-1/2 border border-gray-300 p-2">
                  {submission.name}
                </td>
                <td className="w-1/2 border border-gray-300 p-2">
                  {submission.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        {[
          ...Array(Math.ceil(orderedPhq.length / submissionsPerPage)).keys(),
        ].map((number) => (
          <button
            key={number}
            onClick={() => paginate(number + 1)}
            className={`px-3 py-1 border border-gray-300 mx-1 ${
              currentPage === number + 1 ? 'bg-blue-500 text-white' : ''
            }`}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default PhqSubmissions
