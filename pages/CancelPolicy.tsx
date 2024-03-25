import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { auth, submitCancellationPolicy } from '../firebase/firebase'
import router from 'next/router'

function CancelPolicy() {
  // State declarations for form fields
  const [patientName, setPatientName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState({
    month: '',
    day: '',
    year: '',
  })
  const [signature, setSignature] = useState('')

  // Sets the current date as default for the 'date' field
  const [date, setDate] = useState(() => {
    const today = new Date()
    const formattedDate = `${today.getFullYear()}-${String(
      today.getMonth() + 1,
    ).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
    return formattedDate
  })

  // Redirect to login if no user is authenticated
  useEffect(() => {
    if (!auth.currentUser?.email) {
      router.push('/PatientLogin')
    }
  }, [])

  // Handles form submission
  const handleSubmit = () => {
    const formattedDob = `${dateOfBirth.month}-${dateOfBirth.day}-${dateOfBirth.year}`

    if (
      !patientName ||
      dateOfBirth.day === '' ||
      dateOfBirth.month === '' ||
      dateOfBirth.year === '' ||
      !date ||
      !signature
    ) {
      toast.error('Please fill out all fields.')
      return
    }

    const formData = {
      patientId: patientName.replace(/\s+/g, '-').toLowerCase(),
      patientName,
      dateOfBirth: formattedDob,
      signature,
      date,
    }

    submitCancellationPolicy(formData)
      .then(() => {
        toast.success('Form submitted successfully!')
        // Informing the user about the sign-out
        toast.info('You will be signed out shortly.', {
          // This delay plus the sign-out delay ensures this message stays visible until the sign-out occurs
          autoClose: 2000,
        })
        // Clear the form fields
        setPatientName('')
        setDateOfBirth({ month: '', day: '', year: '' })
        setSignature('')
        setDate('')
        // Sign out after a delay of 2-3 seconds to allow the user to read the message
        setTimeout(() => {
          auth
            .signOut()
            .then(() => {
              router.push('/PatientLogin') // Redirect to login page after sign out
            })
            .catch((error) => {
              toast.error('Error signing out: ' + error.message)
            })
        }, 3000) // Delay for signing out, ensuring it happens after the info message
      })
      .catch((error) => {
        toast.error('Error submitting form: ' + error.message)
      })
  }

  return (
    <div>
      <ToastContainer position="bottom-right" />
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 mt-8 space-y-6">
        <h1 className="text-center text-3xl font-bold text-gray-700 mb-4">
          Cancellation Policy
        </h1>
        <p>
          Each time a patient misses an appointment without providing proper
          notice, another patient is prevented from receiving care. You{' '}
          <strong>MUST</strong> give our office 24 hour notice prior to your
          scheduled appointment. Calling the day of your scheduled appointment
          will result in a "No Show" fee.
        </p>
        <p>
          Mulitple No Shows in any 12-month period may result in termination of
          services with the provider. No Show fees will be billed to the
          patient. This fee is not covered by any insurance plan and will be
          your responsibility. Cancellation/No Show fees will have to be paid in
          order to continue services with Christina. If an appointment is made
          any fees incurred must be paid prior to the visit.
        </p>
        <p className="text-center">
          <strong>
            <i>
              $100 - Charge for missed appointments or appointments cancelled
              with less than 24-hour notice.
            </i>
          </strong>
        </p>
        <p>
          <strong>
            By signing below, I acknowledge that I have read and understand the
            cancellation policy of American Medical Associates and agree to the
            policy set forth.
          </strong>
        </p>
        <div className="flex flex-wrap justify-between gap-4">
          <div className="flex-1 min-w-[290px]">
            <label
              htmlFor="facility"
              className="block text-lg text-gray-700 mb-2"
            >
              Printed Name:
            </label>
            <input
              id="facility"
              type="text"
              placeholder="Your Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
          </div>
          <div className="flex-1 min-w-[290px]">
            <label htmlFor="date" className="block text-lg text-gray-700 mb-2">
              Date:
            </label>
            <input
              id="date"
              type="date"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="flex-1 min-w-[290px]">
            <label
              htmlFor="signature"
              className="block text-lg text-gray-700 mb-2"
            >
              Signature:
            </label>
            <input
              id="signature"
              type="text"
              placeholder="Signature"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
            />
          </div>
          <div className="flex-1 min-w-[290px]">
            <label
              htmlFor="dateOfBirth"
              className="block text-lg text-gray-700 mb-2"
            >
              DOB (MM/DD/YYYY):
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="MM"
                maxLength={2}
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-1/3"
                value={dateOfBirth.month}
                onChange={(e) =>
                  setDateOfBirth({ ...dateOfBirth, month: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="DD"
                maxLength={2}
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-1/3"
                value={dateOfBirth.day}
                onChange={(e) =>
                  setDateOfBirth({ ...dateOfBirth, day: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="YYYY"
                maxLength={4}
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-1/3"
                value={dateOfBirth.year}
                onChange={(e) =>
                  setDateOfBirth({ ...dateOfBirth, year: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default CancelPolicy
