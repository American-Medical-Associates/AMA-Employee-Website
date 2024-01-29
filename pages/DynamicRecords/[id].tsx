import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { auth, db } from '../../firebase/firebase' // Adjust the import as necessary
import { doc, getDoc } from 'firebase/firestore'
import Header from '../../components/navigation/Header'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

// Define the structure for submission data
interface SubmissionData {
  id: string
  patientName: string
  dateOfBirth: string // Assuming this is a formatted string like "MM-DD-YYYY"
  date: string // Submission date
  facility: string
  phoneNumber: string
  fax: string
  appointmentTime: string
  amOrPm: string
}

function RecordsRequestDetails() {
  const router = useRouter()
  const [submission, setSubmission] = useState<SubmissionData | null>(null)
  const printRef = useRef<HTMLDivElement>(null)

  // Redirect to login if no user is authenticated
  useEffect(() => {
    if (!auth.currentUser?.email) {
      router.push('/PatientLogin')
    }
  }, [])

  // Fetch and set submission data on component mount
  useEffect(() => {
    const fetchSubmission = async () => {
      if (router.isReady) {
        const id = router.query.id as string
        const docRef = doc(db, 'companys', 'AMA', 'Records Request', id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setSubmission(docSnap.data() as SubmissionData)
        } else {
          console.log('No such document!')
        }
      }
    }

    fetchSubmission()
  }, [router.isReady, router.query])

  // Function to export details as PDF
  const exportAsPDF = async () => {
    const input = document.getElementById('export')
    if (input) {
      html2canvas(input, {
        scale: 2, // Adjust for higher resolution
        useCORS: true,
        logging: true,
        width: input.scrollWidth,
        height: input.scrollHeight,
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF({
          orientation: 'portrait', // 'portrait' or 'landscape'
          unit: 'mm',
          format: 'a4',
        })

        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()
        const canvasWidth = canvas.width
        const canvasHeight = canvas.height
        const canvasAspectRatio = canvasWidth / canvasHeight
        const pdfAspectRatio = pdfWidth / pdfHeight

        let finalCanvasWidth, finalCanvasHeight

        // Adjust canvas size to fit within the PDF
        if (canvasAspectRatio > pdfAspectRatio) {
          finalCanvasWidth = pdfWidth
          finalCanvasHeight = pdfWidth / canvasAspectRatio
        } else {
          finalCanvasHeight = pdfHeight
          finalCanvasWidth = pdfHeight * canvasAspectRatio
        }

        pdf.addImage(imgData, 'PNG', 0, 0, finalCanvasWidth, finalCanvasHeight)
        pdf.save('submission-details.pdf')
      })
    }
  }

  // Display loading indicator while data is being fetched
  if (!submission) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    )
  }

  // Render the submission details
  return (
    <div>
      <Header selectCompany={'AMA'} routePatientsHome={true} />
      <div
    id="export"
    ref={printRef}
    className="container mx-auto p-8 bg-white shadow-lg rounded-lg"
  >
    <div className="flex items-center mb-6">
      <img
        src="/American Medical Associates.png"
        alt="AMA Logo"
        className="w-24 mr-4" // Adjust width as needed
      />
      <div className="flex-grow">
        <h1 className="text-3xl font-bold mb-2">American Medical Associates</h1>
        <h6>Primary Care / Internal Medicine Multi-Specialty Group</h6>
      </div>
    </div>

    <h2 className="text-3xl font-bold text-gray-800 mb-6">
      Records Request
    </h2>
    <h3 className="text-2xl font-semibold text-gray-800 mb-6">
      Submission Details
    </h3>
        <div className="space-y-4">
          {/* Displaying submission details */}
          <p>
            <span className="font-bold">Patient Name:</span>{' '}
            {submission.patientName}
          </p>
          <p>
            <span className="font-bold">Date:</span> {submission.date}
          </p>
          <p>
            <span className="font-bold">Date of Birth:</span>{' '}
            {submission.dateOfBirth}
          </p>
          <p>
            <span className="font-bold">Facility:</span> {submission.facility}
          </p>
          <p>
            <span className="font-bold">Phone Number:</span>{' '}
            {submission.phoneNumber}
          </p>
          <p>
            <span className="font-bold">Fax:</span> {submission.fax}
          </p>
          <p>
            <span className="font-bold">Appointment Time:</span>{' '}
            {submission.appointmentTime} {submission.amOrPm}
          </p>
        </div>
        <div className="p-6 mt-8 text-center text-lg">
          <p className="text-xl text-gray-700 mb-3">
            Please fax any and all medical records which include
          </p>
          <ol className="list-none text-gray-700 mb-5 inline-block text-center">
            <li>Consults</li>
            <li>H&P</li>
            <li>Discharge Summary</li>
            <li>Lab Results</li>
            <li>Radiology Results</li>
          </ol>

          <p className="text-lg text-gray-700">
            <b>Please fax to:</b> Chandler <b>480-306-4648</b> or Maricopa{' '}
            <b>520-217-3238</b>
          </p>
          <p className="text-lg text-gray-700 mb-5">
            Please call with any questions or concerns.
          </p>
          <p className="text-lg text-gray-700">Thank You!</p>
        </div>
      </div>
      {/* Export to PDF button */}
      <div className="flex justify-center mt-8 pb-8">
        <button
          onClick={exportAsPDF}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Export to PDF
        </button>
      </div>
    </div>
  )
}

export default RecordsRequestDetails
