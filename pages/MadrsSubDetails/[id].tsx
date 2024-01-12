import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { auth, getSpecificMadrs } from '../../firebase/firebase' // Adjust the import path as necessary
import Header from '../../components/navigation/Header'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface MadrsSubmission {
  name: string
  date: string
  dob: string
  totalScore: number
  apparentSadness: number
  reportedSadness: number
  innerTension: number
  reducedSleep: number
  reducedAppetite: number
  concentrationDifficulties: number
  lassitude: number
  inabilityToFeel: number
  pessimisticThoughts: number
  suicidalThoughts: number
}

const MadrsSubDetail = () => {
  const router = useRouter()
  const { id } = router.query
  const [submissionDetails, setSubmissionDetails] =
    useState<MadrsSubmission | null>(null)

    useEffect(() => {
      if (!auth.currentUser?.email) {
        router.push('/PatientLogin')
      }
    }, [])

  useEffect(() => {
    if (id) {
      // @ts-ignore
      getSpecificMadrs(id).then(setSubmissionDetails)
    }
  }, [id])

  if (!submissionDetails) {
    return <div>Loading...</div>
  }

  const exportAsPDF = () => {
    const input = document.getElementById('export') as HTMLElement; // Type assertion
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: [canvas.width, canvas.height]
        });
        // @ts-ignore
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save('MADRS-Depression-Scale.pdf');
      })
      .catch((error) => {
        console.error('Error exporting PDF:', error);
      });
  };

  return (
    <div className="bg-gray-200">
      <Header selectCompany={'AMA'} routePatientsHome={true} />
      <div id="export" className="max-w-xl mx-auto mt-5 p-6 bg-white shadow-md rounded-lg">
        <h2 className="mb-8 text-2xl font-bold text-[#457aff] text-center">
          MADRS Depression Scale
        </h2>
        <div className="space-y-4">
          <p className="text-lg">
            <span className="font-semibold">Name:</span>{' '}
            {submissionDetails.name}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Date of Birth:</span>{' '}
            {submissionDetails.dob}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Date:</span>{' '}
            {submissionDetails.date}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Total Score:</span>{' '}
            {submissionDetails.totalScore}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Apparent Sadness:</span>{' '}
            {submissionDetails.apparentSadness}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Reported Sadness:</span>{' '}
            {submissionDetails.reportedSadness}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Inner Tension:</span>{' '}
            {submissionDetails.innerTension}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Reduced Sleep:</span>{' '}
            {submissionDetails.reducedSleep}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Reduced Appetite:</span>{' '}
            {submissionDetails.reducedAppetite}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Concentration Difficulties:</span>{' '}
            {submissionDetails.concentrationDifficulties}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Lassitude:</span>{' '}
            {submissionDetails.lassitude}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Inability To Feel:</span>{' '}
            {submissionDetails.inabilityToFeel}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Pessimistic Thoughts:</span>{' '}
            {submissionDetails.pessimisticThoughts}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Suicidal Thoughts:</span>{' '}
            {submissionDetails.suicidalThoughts}
          </p>
          <div className="text-center mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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

export default MadrsSubDetail
