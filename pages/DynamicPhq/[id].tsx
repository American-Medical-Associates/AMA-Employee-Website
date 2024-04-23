import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { auth, getSpecificPhq } from '../../firebase/firebase' // Adjust the import path as necessary

import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

interface PhqSubmission {
  name: string
  date: string
  totalScore: number
  littleInterest: string
  feelingDown: string
  fallingAsleep: string
  tiredness: string
  poorAppetite: string
  feelingBad: string
  troubleConcentrating: string
  speakingSlowly: string
  suicidalThoughts: number
}

const PhqDetails = () => {
  const router = useRouter()
  const { id } = router.query
  const [submissionDetails, setSubmissionDetails] =
    useState<PhqSubmission | null>(null)

  useEffect(() => {
    if (!auth.currentUser?.email) {
      router.push('/PatientLogin')
    }
  }, [])

  useEffect(() => {
    if (id) {
      // @ts-ignore
      getSpecificPhq(id).then(setSubmissionDetails)
    }
  }, [id])

  if (!submissionDetails) {
    return <div>Loading...</div>
  }

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

  return (
    <div className="bg-gray-100 p-6">
      <div
        id="export"
        className="max-w-4xl mx-auto my-6 p-6 bg-white shadow-lg rounded-lg"
      >
        <h2 className="text-3xl font-semibold text-[#457aff] text-center">
          Patient Health Questionnaire (PHQ-9)
        </h2>
        <div className="space-y-6 mt-6">
          {Object.entries(submissionDetails).map(([key, value]) => {
            if (!['id'].includes(key)) {
              return key === 'name' ? (
                <p className="text-xl">
                  <span className="font-semibold capitalize">{key}:</span>{' '}
                  <span className="font-normal">{value}</span>
                </p>
              ) : (
                <p className="text-lg">
                  <span className="font-semibold capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}:
                  </span>{' '}
                  {value}
                </p>
              )
            }
            return null
          })}
          <div className="p-5 my-5 bg-blue-100 border-l-8 border-blue-500">
            <h3 className="text-xl font-semibold mb-2">
              Interpretation of Total Score for Depression Severity:
            </h3>
            <ul className="list-disc pl-8">
              <li>1-4 Minimal Depression</li>
              <li>5-9 Mild Depression</li>
              <li>10-14 Moderate Depression</li>
              <li>15-19 Moderately Severe Depression</li>
              <li>20-27 Severe Depression</li>
            </ul>
          </div>
          <div className="text-center">
            <button
              className="bg-[#457aff] hover:bg-[#3461c1] text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
              onClick={exportAsPDF}
            >
              Export as PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhqDetails
