import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { auth, db } from '../../firebase/firebase' // Adjust the import as necessary
import { doc, getDoc } from 'firebase/firestore'

import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

// Define the structure for submission data
interface SubmissionData {
  id: string
  patientName: string
  patientDOB: string
  lastFourSSN: string
  patientStreetAddress: string
  patientCity: string
  patientState: string
  patientZip: string
  patientPhone: string
  purposeOfRelease: string
  treatmentFrom: string
  treatmentTo: string
  facilityName: string
  facilityAddress: string
  facilityPhone: string
  facilityFax: string
  nameOfPractice: string
  addressOfPractice: string
  practicePhone: string
  practiceFax: string
  hospital: string
  officeClinic: string
  format: string
  deliveryMethod: string
  patientSignature: string
  legalGuardianSignature: string
  relationshipToPatient: string
  dateOfRequest: string
  date: string
}

function DynamicPatientReleaseForm() {
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
        const docRef = doc(
          db,
          'companys',
          'AMA',
          'releaseProtectedHealthInformation',
          id,
        )
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
            <h1 className="text-3xl font-bold mb-2">
              American Medical Associates
            </h1>
            <h6>Primary Care / Internal Medicine Multi-Specialty Group</h6>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Authorization to Release Protected Health Information
        </h2>
        <div className="space-y-4">
          {/* Displaying submission details */}
          <p>
            <span className="font-bold">Patient Name:</span>{' '}
            {submission.patientName}
          </p>
          <p>
            <span className="font-bold">Date of Birth:</span>{' '}
            {submission.patientDOB}
          </p>
          <p>
            <span className="font-bold">Last Four of SSN:</span>{' '}
            {submission.lastFourSSN}
          </p>
          <p>
            <span className="font-bold">Street Address:</span>{' '}
            {submission.patientStreetAddress}
          </p>
          <p>
            <span className="font-bold">City:</span> {submission.patientCity}
          </p>
          <p>
            <span className="font-bold">State:</span> {submission.patientState}
          </p>
          <p>
            <span className="font-bold">Zip Code:</span> {submission.patientZip}
          </p>
          <p>
            <span className="font-bold">Phone Number:</span>{' '}
            {submission.patientPhone}
          </p>
          <p>
            <span className="font-bold">Purpose of Release:</span>{' '}
            {submission.purposeOfRelease}
          </p>
          <p>
            <span className="font-bold">Treatment From:</span>{' '}
            {submission.treatmentFrom}
          </p>
          <p>
            <span className="font-bold">Treatment To:</span>{' '}
            {submission.treatmentTo}
          </p>
          <p>
            <span className="font-bold">Facility Name:</span>{' '}
            {submission.facilityName}
          </p>
          <p>
            <span className="font-bold">Facility Address:</span>{' '}
            {submission.facilityAddress}
          </p>
          <p>
            <span className="font-bold">Facility Phone:</span>{' '}
            {submission.facilityPhone}
          </p>
          <p>
            <span className="font-bold">Facility Fax:</span>{' '}
            {submission.facilityFax}
          </p>
          <p>
            <span className="font-bold">Name of Practice:</span>{' '}
            {submission.nameOfPractice}
          </p>
          <p>
            <span className="font-bold">Address of Practice:</span>{' '}
            {submission.addressOfPractice}
          </p>
          <p>
            <span className="font-bold">Practice Phone:</span>{' '}
            {submission.practicePhone}
          </p>
          <p>
            <span className="font-bold">Practice Fax:</span>{' '}
            {submission.practiceFax}
          </p>
          <p>
            <span className="font-bold">Hospital:</span> {submission.hospital}
          </p>
          <p>
            <span className="font-bold">Office or Clinic:</span>{' '}
            {submission.officeClinic}
          </p>
          <p>
            <span className="font-bold">Format:</span> {submission.format}
          </p>
          <p>
            <span className="font-bold">Delivery Method:</span>{' '}
            {submission.deliveryMethod}
          </p>
          <p>
            <span className="font-bold">Patient Signature:</span>{' '}
            {submission.patientSignature}
          </p>
          <p>
            <span className="font-bold">Legal Guardian Signature:</span>{' '}
            {submission.legalGuardianSignature}
          </p>
          <p>
            <span className="font-bold">Relationship to Patient:</span>{' '}
            {submission.relationshipToPatient}
          </p>
          <p>
            <span className="font-bold">Date of Request:</span>{' '}
            {submission.dateOfRequest}
          </p>
          <p>
            <span className="font-bold">Date:</span> {submission.date}
          </p>
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

export default DynamicPatientReleaseForm
