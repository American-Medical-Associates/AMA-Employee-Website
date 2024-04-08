import React, { useState, useEffect, ChangeEvent } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { auth, submitExcisionForm } from '../firebase/firebase'
import router from 'next/router'
import { formatDate } from '../components/Formatters/DateFormatter'

function SubstanceContract() {
  // State declarations for form fields
  const [patientName, setPatientName] = useState('')
  const [providersName, setProvidersName] = useState('')
  const [patientSignature, setPatientSignature] = useState('')
  const [witnessSignature, setWitnessSignature] = useState('')
  const [providersSignature, setProvidersSignature] = useState('')
  const [date, setDate] = useState(formatDate(new Date()))
  const [providersDate, setProvidersDate] = useState(formatDate(new Date()))
  const [initials, setInitials] = useState('')
  const [exceptions, setExceptions] = useState('')

  // Redirects to login page if no user is authenticated
  useEffect(() => {
    if (!auth.currentUser?.email) {
      router.push('/PatientLogin')
    }
  }, [])

  const handlePatientName = (event: ChangeEvent<HTMLInputElement>) => {
    setPatientName(event.target.value)
  }

  const handleProvidersName = (event: ChangeEvent<HTMLInputElement>) => {
    setProvidersName(event.target.value)
  }

  const handleInitials = (event: ChangeEvent<HTMLInputElement>) => {
    setInitials(event.target.value)
  }

  const handleExceptions = (event: ChangeEvent<HTMLInputElement>) => {
    setExceptions(event.target.value)
  }

  const handlePatientSignature = (event: ChangeEvent<HTMLInputElement>) => {
    setPatientSignature(event.target.value)
  }

  const handleWitnessSignature = (event: ChangeEvent<HTMLInputElement>) => {
    setWitnessSignature(event.target.value)
  }

  const handleDate = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value)
  }

  const handleProvidersSignature = (event: ChangeEvent<HTMLInputElement>) => {
    setProvidersSignature(event.target.value)
  }

  const handleProvidersDate = (event: ChangeEvent<HTMLInputElement>) => {
    setProvidersDate(event.target.value)
  }

  // Handles form submission
  const handleSubmit = () => {
    // Validation to ensure all fields are filled
    if (
      !patientName ||
      !providersName ||
      !patientSignature ||
      !witnessSignature ||
      !date ||
      !providersSignature ||
      !initials ||
      !providersDate
    ) {
      toast.error('Please fill out all fields.')
      return
    }

    // Constructing the form data for submission
    const formData = {
      patientId: patientName.replace(/\s+/g, '-').toLowerCase(),
      patientName,
      providersName,
      initials,
      exceptions,
      patientSignature,
      witnessSignature,
      date,
      providersSignature,
      providersDate,
    }
    // Submit the form data to the server/database
    submitExcisionForm(formData)
      .then(async () => {
        toast.success('Form submitted successfully!')
        router.push('/ExcisionThankYou') // Redirect to Thank You page
      })
      .then(() => {
        auth.signOut()
      })
      .catch((error) => {
        toast.error('Error submitting form: ' + error.message)
      })
  }

  return (
    <div>
      <ToastContainer position={'bottom-right'} />

      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
        <h1 className="text-center text-3xl font-bold text-gray-700 mb-6">
          Excision Form
        </h1>
        <div className="space-y-4">
          <p className="text-lg text-gray-700">
            I,
            <input
              type="text"
              placeholder="Patient's Name"
              className="mx-2 p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
              value={patientName}
              onChange={handlePatientName}
              required
            />
            authorize
            <input
              type="text"
              placeholder="Provider's Name"
              className="mx-2 p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
              value={providersName}
              onChange={handleProvidersName}
              required
            />
            and associates & assistants of his/her choosing to perform the
            following operation or procedure:
            <b>Excision of a cyst, lump, or mass or suturing of laceration.</b>I
            understand the reason for the procedure is:
            <u>
              Presence of cyst which most likely will become infected or fill
              again: presence of a lump or mass: Presence of laceration that
              requires suturing for effective healing.
            </u>
            <p>
              <br />
              <b>
                Alernative's include: <u>No treatment</u>
              </b>
            </p>
          </p>
          <p className="font-bold text-gray-700">
            <b>Risks:</b> This authorization is given with the understanding
            that: (1) There are risks associated with continuing in my present
            condition without surgery and (2) Any operations or procedures
            involves some risks and hazards. Some of the significant risks of
            this particular procedure are: Excessive bleeding, infection, poor
            healing. I also understand that the more common risks of any
            procedure include:
            <u>
              Infection, bleeding, nerve injury, blood clots, heart attack,
              allergic reactions nad pneumonia. These risks are serious and
              possibly fatal.
            </u>
          </p>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Initials"
              maxLength={4}
              className="mx-2 p-2 w-16 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
              value={initials}
              onChange={handleInitials}
              required
            />
          </div>
          <p className="text-gray-700">
            <b>Local anesthetic:</b> The administration of local anesthetics
            involves potential serious risks such as: convulsions & most
            importantly an extremely rare risk of reaction to medications
            causing death. Other listed possible reactions include: light
            headedness, nervousness, euphoria, confusion, dizziness,
            blurred/double vision, vomiting, hot or cold sensations, numbness,
            twitching, tremors, loss of consciousness, respiratory and/or
            cardiac arrest, slow hear rate, lowered blood pressure, allergic
            skin reactions, and edema. I consent to the use of such anesthetics
            as may be considered necessary by the person responsible for these
            services except:
            <input
              type="text"
              placeholder="Exceptions (If multiple separate by comma), if none type 'None'"
              className="w-full p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
              value={exceptions}
              onChange={handleExceptions}
            />
          </p>
          <p>
            <b>Results not guaranteed:</b> I understand that no guarantee or
            assurance has been made as to the results of the procedure and that
            it may not cure the condition.
          </p>
          <p>
            <b>Patient's consent:</b> I have read and fully understand this
            consent form, and understand I should not sign this form if all
            items, including my questions, have not been explained or answered
            to my satisfaction or if I do not understand any of the items or
            words contained in this consent form. I have no further questions.
          </p>
          <div className="flex flex-col my-2">
            <input
              type="text"
              placeholder="Patient/Responsible Party Signature"
              className="p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
              value={patientSignature}
              onChange={handlePatientSignature}
              required
            />
            <input
              type="text"
              placeholder="Witness Signature"
              className="p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
              value={witnessSignature}
              onChange={handleWitnessSignature}
              required
            />
            <input
              type="text"
              placeholder="Date"
              className="p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
              value={date}
              onChange={handleDate}
              required
            />
            <p>
              <br />
              <b>Providers Declaration:</b> I have discussed the consents of
              this document with the patient and have answered all the patient's
              questions.
            </p>
            <input
              type="text"
              placeholder="Provider's Signature"
              className="p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
              value={providersSignature}
              onChange={handleProvidersSignature}
              required
            />
            <input
              type="text"
              placeholder="Date"
              className="p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
              value={date}
              onChange={handleProvidersDate}
              required
            />
          </div>
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
export default SubstanceContract
