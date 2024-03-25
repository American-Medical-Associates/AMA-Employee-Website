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
  dateOfBirth: string // Assuming this is a formatted string like "MM-DD-YYYY"
  date: string // Submission date
  patientSignature: string
  witnessSignature: string
  initials: string[] // Array of strings for initials
}

// Define agreement statements to be displayed
const agreementStatements = [
  'I agreed to a 1-week follow-up appointment in the office for a blood pressure check and evaluation followed by monthly appointments for re-eval and script.',
  'I agree to full disclosure of all my daily medications & medical history that may pertain to Phentermine use.',
  'I do NOT have Hypertension, Heart Disease, Atherosclerosis, Valvular Heart Disease, Glaucoma, Seizures, Anxiety Disorder or Overactive Thyroid.',
  'I do NOT have a history of alcohol, drug or substance dependence or abuse.',
  'I am NOT pregnant or breast feeding.',
  'I understand Phentermine is intended for short-term use only (1-3 months or as determined between my health care provider and myself.)',
  'I understand Phentermine may be associated with physical and psychological dependence.',
  'I will NOT take any other diet medication (over the counter or prescribed) while on Phentermine.',
  'I agree to return to the office for evaluation of any side effects or problems associated with Phentermine use.',
  'I will not drive or operate machinery till I know how Phentermine will affect me.',
  'I understand that lost/stolen prescriptions will not be refilled early, nor will Phentermine be prior authorized if not covered by my insurance plan.',
  'I will not stop Phentermine suddenly without talking to my health care provider.',
  'I have received and reviewed PHENTERMINE FACTS sheet.',
]

function PhentermineContractDetails() {
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
        const docRef = doc(db, 'companys', 'AMA', 'Phentermine Contracts', id)
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
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Phentermine Submission Details
        </h2>
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
          {/* Render initials with corresponding agreement statements */}
          <div className="mt-6">
            <h3 className="font-bold text-lg mb-2">Initials:</h3>
            {agreementStatements.map((statement, index) => (
              <p key={index} className="text-gray-700 mt-3">
                <span className="font-semibold">
                  {index + 1}. {statement}
                </span>
                <span className="font-bold text-blue-400 py-1 px-2 rounded-lg">
                  Initials: {submission.initials[index]}
                </span>
              </p>
            ))}
          </div>
          {/* Render signatures at the bottom */}
          <div className="flex justify-between mt-10">
            <p>
              <span className="font-bold">Patient Signature:</span>{' '}
              {submission.patientSignature}
            </p>
            <p>
              <span className="font-bold">Witness Signature:</span>{' '}
              {submission.witnessSignature}
            </p>
          </div>
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

export default PhentermineContractDetails
