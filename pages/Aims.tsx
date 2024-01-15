import React from 'react'
import { useState, useEffect } from 'react'
import Header from '../components/navigation/Header'
import { auth, submitAims } from '../firebase/firebase'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import router from 'next/router'
import { set } from 'date-fns'

function Aims() {
  const [patientName, setPatientName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [muscleFacialExpression, setMuscleFacialExpression] = useState('')
  const [lipsAndPerioralArea, setLipsAndPerioralArea] = useState('')
  const [jaw, setJaw] = useState('')
  const [tongue, setTongue] = useState('')
  const [upperBody, setUpperBody] = useState('')
  const [lowerBody, setLowerBody] = useState('')
  const [neckShouldersHips, setNeckShouldersHips] = useState('')
  const [severityAbnormalMovements, setSeverityAbnormalMovements] = useState('')
  const [
    incapacityDueToAbnormalMovements,
    setIncapacityDueToAbnormalMovements,
  ] = useState('')
  const [
    patientsAwarenessOfAbnormalMovements,
    setPatientsAwarenessOfAbnormalMovements,
  ] = useState('')
  const [problemsWithTeeth, setProblemsWithTeeth] = useState('')
  const [dentures, setDentures] = useState('')
  const [endentia, setEndentia] = useState('')
  const [movementsDissappearSleeping, setMovementsDissappearSleeping] =
    useState('')
  const [rater, setRater] = useState('')

  const today = new Date()
  const todayDate = `${
    today.getMonth() + 1
  }-${today.getDate()}-${today.getFullYear()}`

  useEffect(() => {
    if (!auth.currentUser?.email) {
      router.push('/PatientLogin')
    }
  }, [])

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault() // Prevent default form submission

    const timestamp = new Date()

    // Check if any required field is empty
    if (
      !patientName ||
      !dateOfBirth ||
      !rater ||
      [
        muscleFacialExpression,
        lipsAndPerioralArea,
        jaw,
        tongue,
        upperBody,
        lowerBody,
        neckShouldersHips,
        severityAbnormalMovements,
        incapacityDueToAbnormalMovements,
        patientsAwarenessOfAbnormalMovements,
        problemsWithTeeth,
        dentures,
        endentia,
        movementsDissappearSleeping,
      ].some((answer) => answer === '')
    ) {
      alert('Please fill out all fields')
      return
    }

    // Construct the data object you want to submit
    const formData = {
      patientName,
      date: todayDate,
      dateOfBirth,
      rater,
      submissionTime: timestamp,
      answers: [
        {
          question: 'Muscles of Facial Expression',
          answer: muscleFacialExpression,
        },
        { question: 'Lips and Perioral Area', answer: lipsAndPerioralArea },
        { question: 'Jaw', answer: jaw },
        { question: 'Tongue', answer: tongue },
        { question: 'Upper Body', answer: upperBody },
        { question: 'Lower Body', answer: lowerBody },
        { question: 'Neck, Shoulders, and Hips', answer: neckShouldersHips },
        {
          question: 'Severity of Abnormal Movements Overall',
          answer: severityAbnormalMovements,
        },
        {
          question: 'Incapacity Due to Abnormal Movements',
          answer: incapacityDueToAbnormalMovements,
        },
        {
          question: 'Patients Awareness of Abnormal Movements',
          answer: patientsAwarenessOfAbnormalMovements,
        },
        {
          question: 'Problems with Teeth and/or Dentures',
          answer: problemsWithTeeth,
        },
        { question: 'Are Dentures Usually Worn', answer: dentures },
        { question: 'Endentia', answer: endentia },
        {
          question: 'Do Movements Disappear with Sleep',
          answer: movementsDissappearSleeping,
        },
      ],
    }

    try {
      await submitAims(formData)
      toast.success('Form submitted successfully!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      })
      setPatientName('')
      setDateOfBirth('')
      setRater('')
      setMuscleFacialExpression('')
      setLipsAndPerioralArea('')
      setJaw('')
      setTongue('')
      setUpperBody('')
      setLowerBody('')
      setNeckShouldersHips('')
      setSeverityAbnormalMovements('')
      setIncapacityDueToAbnormalMovements('')
      setPatientsAwarenessOfAbnormalMovements('')
      setProblemsWithTeeth('')
      setDentures('')
      setEndentia('')
      setMovementsDissappearSleeping('')
      // Optionally reset form fields or navigate to another page
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('An error occurred while submitting the form.', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 5000,
      })
    }
  }

  return (
    <div>
      <ToastContainer />
      <Header selectCompany={'AMA'} routePatientsHome={true} />
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="patientName"
          >
            Patient's Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="patientName"
            name="patientName"
            type="text"
            placeholder="Enter patients name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="dateOfBirth"
          >
            Date of Birth
          </label>
          
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="rater"
          >
            Evaluating Provider (Rater)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="rater"
            name="rater"
            type="text"
            placeholder="Evaluting Provider's Name"
            value={rater}
            onChange={(e) => setRater(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Date: {todayDate}
          </label>
        </div>
        <div className='text-center mb-8'>
          <p className='text-md font-bold'>
            Code: 0 = None, 1 = Minimal, 2 = Mild, 3 = Moderate, 4 = Severe
          </p>
          <h2 className='mt-3 font-bold'>Movement Ratings:</h2>
          <p className='font-semibold'>
            - Rate highest severity observed in category I, II, III.
          </p>
          <p className='font-semibold'>
          - Rate movements that occur upon activation one point less than those observed spontaneously.
          </p>
          <p className='font-semibold'>
          - Select movements as well as code number that applies.
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">
            <strong>1. Muscles of Facial Expression</strong> Movements of
            forehead, eyebrows, periorbital area, cheeks, including frowning,
            blinking, smiling, grimacing.
          </label>
          {[0, 1, 2, 3, 4].map((option) => (
            <label key={option} className="inline-flex items-center ml-4">
              <input
                type="radio"
                name="muscleFacialExpression"
                value={option}
                checked={muscleFacialExpression === option.toString()}
                onChange={() => setMuscleFacialExpression(option.toString())}
                className="form-radio h-5 w-5 text-gray-600"
              />
              <span className="ml-2 text-gray-700">{option}</span>
            </label>
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">
            <strong>2. Lips and Perioral Area</strong> Puckering pouting,
            smacking
          </label>
          {[0, 1, 2, 3, 4].map((option) => (
            <label key={option} className="inline-flex items-center ml-4">
              <input
                type="radio"
                name="lipsAndPerioralArea"
                value={option}
                checked={lipsAndPerioralArea === option.toString()}
                onChange={() => setLipsAndPerioralArea(option.toString())}
                className="form-radio h-5 w-5 text-gray-600"
              />
              <span className="ml-2 text-gray-700">{option}</span>
            </label>
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">
            <strong>3. Jaw</strong> Clenching, grinding, chewing, lateral
            movements
          </label>
          {[0, 1, 2, 3, 4].map((option) => (
            <label key={option} className="inline-flex items-center ml-4">
              <input
                type="radio"
                name="jaw"
                value={option}
                checked={jaw === option.toString()}
                onChange={() => setJaw(option.toString())}
                className="form-radio h-5 w-5 text-gray-600"
              />
              <span className="ml-2 text-gray-700">{option}</span>
            </label>
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">
            <strong>4. Tongue</strong> Rate only increases in movement both in
            and out of mouth. NOT inability to sustain movement. Darting in and
            out of mouth
          </label>
          {[0, 1, 2, 3, 4].map((option) => (
            <label key={option} className="inline-flex items-center ml-4">
              <input
                type="radio"
                name="tongue"
                value={option}
                checked={tongue === option.toString()}
                onChange={() => setTongue(option.toString())}
                className="form-radio h-5 w-5 text-gray-600"
              />
              <span className="ml-2 text-gray-700">{option}</span>
            </label>
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">
            <strong>5. Upper (arms, wrists hands, finger)</strong> Include
            choreic movements (i.e. rapid objectively purposeless, irregular,
            spontaneous) athetoid movements. DO NO INCLUDE TREMOR (i.e.
            repetitive, regular, rhythmic)
          </label>
          {[0, 1, 2, 3, 4].map((option) => (
            <label key={option} className="inline-flex items-center ml-4">
              <input
                type="radio"
                name="upperBody"
                value={option}
                checked={upperBody === option.toString()}
                onChange={() => setUpperBody(option.toString())}
                className="form-radio h-5 w-5 text-gray-600"
              />
              <span className="ml-2 text-gray-700">{option}</span>
            </label>
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">
            <strong>6. Lower (legs, knees, ankles, toes)</strong> Lateral knee
            movement, foot tapping, heel dropping, foot squirming, inversion and
            eversion of foot
          </label>
          {[0, 1, 2, 3, 4].map((option) => (
            <label key={option} className="inline-flex items-center ml-4">
              <input
                type="radio"
                name="lowerBody"
                value={option}
                checked={lowerBody === option.toString()}
                onChange={() => setLowerBody(option.toString())}
                className="form-radio h-5 w-5 text-gray-600"
              />
              <span className="ml-2 text-gray-700">{option}</span>
            </label>
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">
            <strong>7. Neck, shoulders and hips</strong> Rocking, twisting,
            squirming, pelvic gyrations
          </label>
          {[0, 1, 2, 3, 4].map((option) => (
            <label key={option} className="inline-flex items-center ml-4">
              <input
                type="radio"
                name="neckShouldersHips"
                value={option}
                checked={neckShouldersHips === option.toString()}
                onChange={() => setNeckShouldersHips(option.toString())}
                className="form-radio h-5 w-5 text-gray-600"
              />
              <span className="ml-2 text-gray-700">{option}</span>
            </label>
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">
            <strong>8. Severity of abnormal movements overall</strong>
          </label>
          {[0, 1, 2, 3, 4].map((option) => (
            <label key={option} className="inline-flex items-center ml-4">
              <input
                type="radio"
                name="severityAbnormalMovements"
                value={option}
                checked={severityAbnormalMovements === option.toString()}
                onChange={() => setSeverityAbnormalMovements(option.toString())}
                className="form-radio h-5 w-5 text-gray-600"
              />
              <span className="ml-2 text-gray-700">{option}</span>
            </label>
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">
            <strong>9. Incapacity due to abnormal movements</strong>
          </label>
          {[0, 1, 2, 3, 4].map((option) => (
            <label key={option} className="inline-flex items-center ml-4">
              <input
                type="radio"
                name="incapacityDueToAbnormalMovements"
                value={option}
                checked={incapacityDueToAbnormalMovements === option.toString()}
                onChange={() =>
                  setIncapacityDueToAbnormalMovements(option.toString())
                }
                className="form-radio h-5 w-5 text-gray-600"
              />
              <span className="ml-2 text-gray-700">{option}</span>
            </label>
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">
            <strong>
              10. Patients awareness of abnormal movements. Rate only patients
              report:
            </strong>
            No Awareness = 0 Aware, no distress = 1 Aware, mild distress = 2
            Aware, moderate distress = 3 Aware, severe distress = 4
          </label>
          {[0, 1, 2, 3, 4].map((option) => (
            <label key={option} className="inline-flex items-center ml-4">
              <input
                type="radio"
                name="patientsAwarenessOfAbnormalMovements"
                value={option}
                checked={
                  patientsAwarenessOfAbnormalMovements === option.toString()
                }
                onChange={() =>
                  setPatientsAwarenessOfAbnormalMovements(option.toString())
                }
                className="form-radio h-5 w-5 text-gray-600"
              />
              <span className="ml-2 text-gray-700">{option}</span>
            </label>
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">
            <strong>11. Current problems with teeth and/or dentures</strong>
          </label>
          {['Yes', 'No'].map((option) => (
            <label key={option} className="inline-flex items-center ml-4">
              <input
                type="radio"
                name="problemsWithTeeth"
                value={option}
                checked={problemsWithTeeth === option.toString()}
                onChange={() => setProblemsWithTeeth(option.toString())}
                className="form-radio h-5 w-5 text-gray-600"
              />
              <span className="ml-2 text-gray-700">{option}</span>
            </label>
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">
            <strong>12. Are dentures usually worn</strong>
          </label>
          {['Yes', 'No'].map((option) => (
            <label key={option} className="inline-flex items-center ml-4">
              <input
                type="radio"
                name="dentures"
                value={option}
                checked={dentures === option.toString()}
                onChange={() => setDentures(option.toString())}
                className="form-radio h-5 w-5 text-gray-600"
              />
              <span className="ml-2 text-gray-700">{option}</span>
            </label>
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">
            <strong>13. Endentia?</strong>
          </label>
          {['Yes', 'No'].map((option) => (
            <label key={option} className="inline-flex items-center ml-4">
              <input
                type="radio"
                name="endentia"
                value={option}
                checked={endentia === option.toString()}
                onChange={() => setEndentia(option.toString())}
                className="form-radio h-5 w-5 text-gray-600"
              />
              <span className="ml-2 text-gray-700">{option}</span>
            </label>
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">
            <strong>14. Do movements disappear with sleep?</strong>
          </label>
          {['Yes', 'No', 'N/A'].map((option) => (
            <label key={option} className="inline-flex items-center ml-4">
              <input
                type="radio"
                name="movementDissappearSleeping"
                value={option}
                checked={movementsDissappearSleeping === option.toString()}
                onChange={() =>
                  setMovementsDissappearSleeping(option.toString())
                }
                className="form-radio h-5 w-5 text-gray-600"
              />
              <span className="ml-2 text-gray-700">{option}</span>
            </label>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default Aims
