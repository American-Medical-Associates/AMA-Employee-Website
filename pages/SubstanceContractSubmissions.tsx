import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { auth, db, getSubstanceContracts } from '../firebase/firebase'
import router from 'next/router'
import Header from '../components/navigation/Header'

// Define the structure of a submission
interface Submission {
  id: string
  patientName: string
  dateOfBirth: string
  date: string
  // Other relevant fields from your form
}

function SubstanceContractSubmissions() {
  // State declarations
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [submissionsPerPage] = useState(10)

  // Redirect to login if no user is authenticated
  useEffect(() => {
    if (!auth.currentUser?.email) {
      router.push('/PatientLogin')
    }
  }, [])

  // Function to format date strings
  const formatDate = (dateStr: string | number | Date) => {
    const dateObj = new Date(dateStr)
    const formattedDate =
      String(dateObj.getMonth() + 1).padStart(2, '0') +
      '-' +
      String(dateObj.getDate()).padStart(2, '0') +
      '-' +
      dateObj.getFullYear()
    return formattedDate
  }

  // Fetch submissions from the database
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, 'companys', 'AMA', 'ControlledSubstanceContracts'),
        )
        const submissionsData = querySnapshot.docs.map((doc) => {
          const data = doc.data() as Submission
          return {
            ...data,
            dateOfBirth: formatDate(data.dateOfBirth),
            date: formatDate(data.date),
          }
        })
        setSubmissions(submissionsData)
      } catch (error) {
        console.error('Error fetching submissions: ', error)
      }
    }

    fetchSubmissions()
  }, [])

  // Filter submissions based on search term
  const filteredSubmissions = submissions.filter(
    (submission) =>
      submission.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.date.includes(searchTerm) ||
      submission.dateOfBirth.includes(searchTerm),
    // Add other criteria as needed
  )

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Calculate indices for pagination
  const indexOfLastSubmission = currentPage * submissionsPerPage
  const indexOfFirstSubmission = indexOfLastSubmission - submissionsPerPage
  const currentSubmissions = filteredSubmissions.slice(
    indexOfFirstSubmission,
    indexOfLastSubmission,
  )

  // Calculate total number of pages for pagination
  const pageNumbers = []
  for (
    let i = 1;
    i <= Math.ceil(filteredSubmissions.length / submissionsPerPage);
    i++
  ) {
    pageNumbers.push(i)
  }

  // Handle row click to navigate to a specific submission detail
  const handleRowClick = (submissionId: string) => {
    router.push(`/DynamicSubstance/${submissionId}`)
  }

  return (
    <div>
      <Header selectCompany={'AMA'} routePatientsHome={true} />
      <div className="container mx-auto p-4">
        {/* Search input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name or other criteria"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Table to display submissions data */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 p-2">Patient Name</th>
                <th className="border border-gray-300 p-2">Date of Birth</th>
                <th className="border border-gray-300 p-2">Date Submitted</th>
                {/* Add other headers as needed */}
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {currentSubmissions.map((submission) => (
                <tr
                  key={submission.id}
                  onClick={() => handleRowClick(submission.id)}
                  className="hover:bg-blue-500 hover:text-white cursor-pointer transition duration-300 ease-in-out"
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
                  {/* Add other columns as needed */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
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

export default SubstanceContractSubmissions
