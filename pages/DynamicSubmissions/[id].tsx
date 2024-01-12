import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { auth, getSpecificAims } from '../../firebase/firebase'
import Header from '../../components/navigation/Header'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

interface SubmissionAnswer {
  question: string
  answer: string
}

interface Submission {
  id: string
  patientName: string
  dateOfBirth: string
  date: string
  answers: SubmissionAnswer[]
}

function AimsDetails() {
  const router = useRouter()
  const [submission, setSubmission] = useState<Submission | null>(null)
  const printRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!auth.currentUser?.email) {
      router.push('/PatientLogin')
    }
  }, [])

  useEffect(() => {
    const fetchSubmission = async () => {
      if (router.isReady) {
        const id = router.query.id as string
        const submissionData = await getSpecificAims(id)
        if (submissionData) {
          setSubmission(submissionData as Submission)
        }
      }
    }

    fetchSubmission()
  }, [router.isReady, router.query])

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
        // Create an A4-sized PDF (dimensions in mm)
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

  if (!submission) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Header selectCompany={'AMA'} routePatientsHome={true} />
      <div id="export" className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-6" ref={printRef}>
          <h1 className="text-2xl font-semibold mb-4">Submission Details</h1>
          <p className="text-lg mb-2">
            <strong>Patient Name:</strong> {submission.patientName}
          </p>
          <p className="text-lg mb-2">
            <strong>Date of Birth:</strong> {submission.dateOfBirth}
          </p>
          <p className="text-lg mb-2">
            <strong>Date:</strong> {submission.date}
          </p>
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-3">Answers:</h2>
            <div>
              {submission.answers.map((item, index) => (
                <p key={index} className="text-gray-600">
                  <strong>{item.question}: </strong> {item.answer}
                </p>
              ))}
            </div>
            <button
              onClick={exportAsPDF}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Export to PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AimsDetails
