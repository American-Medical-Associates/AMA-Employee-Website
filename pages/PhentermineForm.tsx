import React, {
  useState,
  useEffect,
  ChangeEventHandler,
  ChangeEvent,
} from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { auth, submitPhentermineForm } from '../firebase/firebase'
import router from 'next/router'
import DateFormatter from './Formatters/DateFormatter'

const PhentermineForm = () => {
  // State declarations for form fields
  const [patientName, setPatientName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState({
    month: '',
    day: '',
    year: '',
  })
  const [patientSignature, setPatientSignature] = useState('')
  const [witnessSignature, setWitnessSignature] = useState('')

  // Sets the current date as default for the 'date' field
  const [date, setDate] = useState(() => DateFormatter.formatDate(new Date()))
  const [initials, setInitials] = useState<string[]>(new Array(12).fill(''))

  // Redirects to login page if no user is authenticated
  useEffect(() => {
    if (!auth.currentUser?.email) {
      router.push('/PatientLogin')
    }
  }, [])

  // Statements for which users must provide initials
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

  // Handles changes in the initials fields
  const handleInitialChange = (index: number, value: string) => {
    const newInitials = [...initials]
    newInitials[index] = value
    setInitials(newInitials)
  }

  const handlePatientName: ChangeEventHandler<HTMLInputElement> = (event) => {
    setPatientName(event.target.value)
  }

  const handleDateOfBirthChange = (
    event: ChangeEvent<HTMLInputElement>,
    field: 'month' | 'day' | 'year',
  ) => {
    setDateOfBirth((prevState) => ({
      ...prevState,
      [field]: event.target.value,
    }))
  }

  const handlePatientSignatureChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setPatientSignature(event.target.value)
  }

  const handleWitnessSignatureChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setWitnessSignature(event.target.value)
  }

  const handleDateChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setDate(event.target.value)
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
      !patientSignature ||
      !witnessSignature ||
      !date ||
      initials.some((initial) => initial === '')
    ) {
      toast.error('Please fill out all fields.')
      return
    }

    // Constructing the form data for submission
    const formData = {
      patientId: patientName.replace(/\s+/g, '-').toLowerCase(),
      patientName,
      dateOfBirth: formattedDob,
      initials,
      patientSignature,
      witnessSignature,
      date,
    }

    // Submit the form data to the server/database
    submitPhentermineForm(formData)
      .then(async () => {
        toast.success('Form submitted successfully!')
        // TODO: Change thank you page to use a Model instead of individual thank you pages.
        router.push('/PhentermineContractThankYou') // Redirect to Thank You page
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
          Phentermine Contract
        </h1>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Full Name"
              className="p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none flex-1"
              value={patientName}
              onChange={handlePatientName}
            />
            <div className="flex items-center ml-4">
              <span className="whitespace-nowrap text-lg text-gray-700 mr-2">
                Date of Birth:
              </span>
              <input
                type="text"
                placeholder="MM"
                maxLength={2}
                className="p-2 w-12 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                value={dateOfBirth.month}
                onChange={(e) => handleDateOfBirthChange(e, 'month')}
              />
              /
              <input
                type="text"
                placeholder="DD"
                maxLength={2}
                className="p-2 w-12 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                value={dateOfBirth.day}
                onChange={(e) => handleDateOfBirthChange(e, 'day')}
              />
              /
              <input
                type="text"
                placeholder="YYYY"
                maxLength={4}
                className="p-2 w-20 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                value={dateOfBirth.year}
                onChange={(e) => handleDateOfBirthChange(e, 'year')}
              />
            </div>
          </div>
          <p className="text-center font-bold text-gray-700">
            Initial beside each statement below after reading which signifies my
            understanding and agreement:
          </p>
          {agreementStatements.map((statement, index) => (
            <div key={index} className="flex flex-col my-2">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Init."
                  maxLength={2}
                  className="mx-2 p-2 w-12 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                  value={initials[index]}
                  onChange={(e) => handleInitialChange(index, e.target.value)}
                />
                <span className="text-gray-700">{statement}</span>
              </div>
            </div>
          ))}
          <div className="flex flex-col my-2">
            <input
              type="text"
              placeholder="Patient Signature"
              className="p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
              value={patientSignature}
              onChange={handlePatientSignatureChange}
            />
            <input
              type="text"
              placeholder="Witness Signature"
              className="p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
              value={witnessSignature}
              onChange={handleWitnessSignatureChange}
            />
            <input
              type="date"
              className="p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
              value={date}
              onChange={handleDateChange}
              pattern="\d{4}-\d{2}-\d{2}"
              max={new Date().toISOString().split('T')[0]}
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
export default PhentermineForm
