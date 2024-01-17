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
  receivedSubstances: string[]
  pharmacy: string
  crossStreets: string
  phoneNumber: string
  patientSignature: string
  witnessSignature: string
  amaEmployeeInitials: string
  initials: string[] // Array of strings for initials
}

// Define agreement statements to be displayed
const agreementStatements = [
  'I have received, read, signed and understand the content in the informed consent for Controlled Substance use, including the risks, benefits and side effects of controlled substance and I will also retain a copy of this policy.',
  'I acknowledge that I will be receiving the following Controlled Substance(s):',
  'I agree to fill my prescriptions at only 1 pharmacy and will immediately advise AMA of any changes:',
  'I agree to be seen at only American Medical Associates for refills and follow-up on the controlled meds mentioned above.',
  'I understand that the ultimate goal of my treatment is to taper and/or discontinue the medication. Long term use of controlled substancees is controversial.',
  'I agree to obtain my prescription for controlled substances exclusivly through American Medical Associates. Receiving/accepting prescriptions from controlled substances other than AMA may result in discharge from practice and is considred a direct violation of this policy. Should I go to the emergency room or another provider, I will notify AMA immediately of any controlled substances perscribed to me.',
  "I agree to take my medications exatly at the dose and frequency prescribed. I will NOT increase or change the dose and frequency without my AMA Provider's direction.",
  'I understand that lost or stolen medications WILL NOT be replaced and that it is my responsibility to have possession and control of my medications at all times. I will not share, sell, or otherwise permit others to have access to my medications.',
  'I agree to meet with my Provider monthly and on a schedule as he or she determines to be appropriate for my needs/conditions. If my provider agrees, I may call for a refill no sooner than 72 hours before I am out of medication. Refills are approved/denied daily after 4pm. I may not call more than once a day for my refills. I understand that in most instances I must be seen to get refills.',
  'I agree to random urine drug screens at my Providers discretion. The presence of absence of any controlled substances not listed on this contract, or a concentration of medical inconsistent with the prescribed dosage may result in discharge from the practice.',
  'I understand that controlled substances will be filled only during an office visit or during regular office hours. I will not call after hours or weekends for refills as they will not be approved.',
  'Failure to comply with any of the above may be considered direct violation of AMA policy and may be discharged from the practice. Should this occur, it is my responsibilty to acquire a new Primary Care Provider.',
]

function SubstanceContractDetails() {
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
          'ControlledSubstanceContracts',
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
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Submission Details
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
          <p>
            <span className="font-bold">Received Substances:</span>{' '}
            {submission.receivedSubstances.join(', ')}
          </p>
          <p>
            <span className="font-bold">Pharmacy:</span> {submission.pharmacy}
          </p>
          <p>
            <span className="font-bold">Cross Streets:</span>{' '}
            {submission.crossStreets}
          </p>
          <p>
            <span className="font-bold">Phone Number:</span>{' '}
            {submission.phoneNumber}
          </p>
          {/* Render initials with corresponding agreement statements */}
          <div className="mt-6">
            <h3 className="font-bold text-lg mb-2">Initials:</h3>
            {submission.initials.map((initial, index) => (
              <p key={index} className="text-gray-700">
                <span className="font-semibold">
                  {index + 1}. {agreementStatements[index]}
                </span>
                -{' '}
                <span className="font-medium bg-blue-100 text-blue-800 py-1 px-2 rounded-lg">
                  Initials: {initial}
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
            <p>
              <span className="font-bold">AMA Employee Initials:</span>{' '}
              {submission.amaEmployeeInitials}
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

export default SubstanceContractDetails
