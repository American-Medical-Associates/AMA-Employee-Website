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
  signature: string
}

function CancellationPolicyDetails() {
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
          'Cancellation Policy',
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
      <Header selectCompany={'AMA'} routePatientsHome={true} />
      <div
        id="export"
        ref={printRef}
        className="container mx-auto p-8 bg-white shadow-lg rounded-lg"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Cancellation Policy Submission Details
        </h2>
        <p className='mb-5'>Each time a patient misses an appointment without providing proper notice, another patient is prevented from receiving care. You <strong>MUST</strong> give our office 24 hour notice prior to your scheduled appointment. Calling the day of your scheduled appointment will result in a "No Show" fee.</p>
        <p className='mb-5'>Mulitple No Shows in any 12-month period may result in termination of services with the provider. No Show fees will be billed to the patient. This fee is not covered by any insurance plan and will be your responsibility. Cancellation/No Show fees will have to be paid in order to continue services with Christina. If an appointment is made any fees incurred must be paid prior to the visit.</p>
        <p className="text-center mb-5"><strong><i>$100 - Charge for missed appointments or appointments cancelled with less than 24-hour notice.</i></strong></p>
        <p className='mb-5'><strong>By signing below, I acknowledge that I have read and understand the cancellation policy of American Medical Associates and agree to the policy set forth.</strong></p>
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
              <span className="font-bold">Patient Signature:</span>{' '}
              {submission.signature}
            </p>
          <p>
            <span className="font-bold">Date of Birth:</span>{' '}
            {submission.dateOfBirth}
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

export default CancellationPolicyDetails
