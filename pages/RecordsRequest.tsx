import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { auth, submitRecordsRequest } from '../firebase/firebase'
import router from 'next/router'

function recordsRequest() {
  // State declarations for form fields
  const [patientName, setPatientName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState({
    month: '',
    day: '',
    year: '',
  })
  const [facility, setFacility] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [fax, setFax] = useState('')
  const [appointmentTime, setAppointmentTime] = useState('')
  const [amOrPm, setAmOrPm] = useState('')

  // Sets the current date as default for the 'date' field
  const [date, setDate] = useState(() => {
    const today = new Date()
    const formattedDate = `${today.getFullYear()}-${String(
      today.getMonth() + 1,
    ).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
    return formattedDate
  })

  // Redirects to login page if no user is authenticated
  useEffect(() => {
    if (!auth.currentUser?.email) {
      router.push('/PatientLogin')
    }
  }, [])

  // Formats the Phone number and Fax number fields for (###) ###-####
  const formatPhoneNumber = (value: string) => {
    if (!value) return value
    const phoneNumber = value.replace(/[^\d]/g, '')
    const phoneNumberLength = phoneNumber.length
    if (phoneNumberLength < 4) return phoneNumber
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6,
    )}-${phoneNumber.slice(6, 10)}`
  }

  // Handles phone number changes
  const handlePhoneNumberChange = (e: { target: { value: string } }) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value)
    setPhoneNumber(formattedPhoneNumber)
  }

  // Handles fax number changes
  const handleFaxChange = (e: { target: { value: string } }) => {
    const formattedFaxNumber = formatPhoneNumber(e.target.value)
    setFax(formattedFaxNumber)
  }

  // Handles form submission
  const handleSubmit = () => {
    // Format date of birth for submission
    const formattedDob = `${dateOfBirth.month}-${dateOfBirth.day}-${dateOfBirth.year}`

    // Validation to ensure all fields are filled
    if (
      !patientName ||
      dateOfBirth.day === '' ||
      dateOfBirth.month === '' ||
      dateOfBirth.year === '' ||
      !date ||
      facility === '' ||
      phoneNumber === '' ||
      fax === '' ||
      appointmentTime === '' ||
      amOrPm === ''
    ) {
      toast.error('Please fill out all fields.')
      return
    }

    // Constructing the form data for submission
    const formData = {
      patientId: patientName.replace(/\s+/g, '-').toLowerCase(),
      patientName,
      dateOfBirth: formattedDob,
      facility,
      phoneNumber,
      fax,
      date,
      appointmentTime,
      amOrPm,
    }
    // Submit the form data to the server/database
    submitRecordsRequest(formData)
      .then(() => {
        toast.success('Form submitted successfully!')

        // Reset form fields to initial state
        setPatientName('')
        setDateOfBirth({ month: '', day: '', year: '' })
        setFacility('')
        setPhoneNumber('')
        setFax('')
        setDate('')
        setAppointmentTime('')
        setAmOrPm('')
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
          Hosptial Records Request
        </h1>
        <div className="space-y-4">
          <div>
            <label htmlFor="facility" className="text-lg text-gray-700">
              Facility:
            </label>
            <input
              id="facility"
              type="text"
              placeholder="Facility"
              className="ml-2 p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none w-full"
              value={facility}
              onChange={(e) => setFacility(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <div className="flex-1 mr-2">
              <label htmlFor="phoneNumber" className="text-lg text-gray-700">
                Phone Number:
              </label>
              <input
                id="phoneNumber"
                type="text"
                placeholder="Phone Number"
                className="ml-2 p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none w-full"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
            </div>
            <div className="flex-1 ml-2">
              <label htmlFor="fax" className="text-lg text-gray-700">
                Fax:
              </label>
              <input
                id="fax"
                type="text"
                placeholder="Fax"
                className="ml-2 p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none w-full"
                value={fax}
                onChange={handleFaxChange}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex-1 mr-2">
              <label htmlFor="patientName" className="text-lg text-gray-700">
                Patient:
              </label>
              <input
                id="patientName"
                type="text"
                placeholder="Patient Name"
                className="ml-2 p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none w-full"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
              />
            </div>
            <div className="flex-1 ml-2">
              <label htmlFor="dateOfBirth" className="text-lg text-gray-700">
                DOB:
              </label>
              <div className="flex">
                <input
                  type="text"
                  placeholder="MM"
                  maxLength={2}
                  className="ml-2 p-2 w-12 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                  value={dateOfBirth.month}
                  onChange={(e) => {
                    const newMonth = e.target.value
                    const monthNumber = parseInt(newMonth, 10)
                    if (
                      newMonth === '' ||
                      (monthNumber > 0 && monthNumber <= 12)
                    ) {
                      setDateOfBirth({ ...dateOfBirth, month: newMonth })
                    } else {
                      toast.error('Please enter a valid month.')
                    }
                  }}
                />
                <input
                  type="text"
                  placeholder="DD"
                  maxLength={2}
                  className="mx-1 p-2 w-12 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                  value={dateOfBirth.day}
                  onChange={(e) =>
                    setDateOfBirth({ ...dateOfBirth, day: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="YYYY"
                  maxLength={4}
                  className="mx-1 p-2 w-20 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                  value={dateOfBirth.year}
                  onChange={(e) =>
                    setDateOfBirth({ ...dateOfBirth, year: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex-1 mr-2">
              <label htmlFor="date" className="text-lg text-gray-700">
                Appt Date:
              </label>
              <input
                id="Appt Date"
                type="date"
                className="ml-2 p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none w-full"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="flex-1 ml-2">
              <label
                htmlFor="appointmentTime"
                className="text-lg text-gray-700"
              >
                Appt Time:
              </label>
              <input
                id="appointmentTime"
                type="appointmentTime"
                placeholder="Appointment Time"
                className="ml-2 p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none w-full"
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
              />
            </div>
            <div className="flex-1 ml-2">
              <div className="text-lg text-gray-700">AM/PM:</div>
              <form className="flex items-center">
                <input
                  type="radio"
                  id="am"
                  name="amOrPm"
                  value="am"
                  onChange={(e) => setAmOrPm(e.target.value)}
                />
                <label htmlFor="am" className="ml-2">
                  AM
                </label>
                <input
                  type="radio"
                  id="pm"
                  name="amOrPm"
                  value="pm"
                  className="ml-4"
                  onChange={(e) => setAmOrPm(e.target.value)}
                />
                <label htmlFor="pm" className="ml-2">
                  PM
                </label>
              </form>
            </div>
          </div>
          <div className="p-6 mt-8 text-center text-lg">
            <p className="text-xl text-gray-700 mb-3">
              Please fax any and all medical records which include
            </p>
            <ol className="list-none text-gray-700 mb-5 inline-block text-center">
              <li>Consults</li>
              <li>H&P</li>
              <li>Discharge Summary</li>
              <li>Lab Results</li>
              <li>Radiology Results</li>
            </ol>

            <p className="text-lg text-gray-700">
              <b>Please fax to:</b> Chandler <b>480-306-4648</b> or Maricopa{' '}
              <b>520-217-3238</b>
            </p>
            <p className="text-lg text-gray-700 mb-5">
              Please call with any questions or concerns.
            </p>
            <p className="text-lg text-gray-700">Thank You!</p>
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
export default recordsRequest
