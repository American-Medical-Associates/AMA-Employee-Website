import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from '../components/navigation/Header'
import { auth, submitControlledSubstance } from '../firebase/firebase'
import router from 'next/router'

function SubstanceContract() {
  // State declarations for form fields
  const [patientName, setPatientName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState({
    month: '',
    day: '',
    year: '',
  })
  const [receivedSubstances, setReceivedSubstances] = useState([''])
  const [pharmacy, setPharmacy] = useState('')
  const [crossStreets, setCrossStreets] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [patientSignature, setPatientSignature] = useState('')
  const [witnessSignature, setWitnessSignature] = useState('')
  const [amaEmployeeInitials, setAmaEmployeeInitials] = useState('')

  // Sets the current date as default for the 'date' field
  const [date, setDate] = useState(() => {
    const today = new Date()
    const formattedDate = `${today.getFullYear()}-${String(
      today.getMonth() + 1,
    ).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
    return formattedDate
  })

  const [initials, setInitials] = useState<string[]>(new Array(12).fill(''))

  // Redirects to login page if no user is authenticated
  useEffect(() => {
    if (!auth.currentUser?.email) {
      router.push('/PatientLogin')
    }
  }, [])

  // Statements for which users must provide initials
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

  // Handles changes in the initials fields
  const handleInitialChange = (index: number, value: string) => {
    const newInitials = [...initials]
    newInitials[index] = value
    setInitials(newInitials)
  }

  // Adds a new field to enter additional substances
  const addSubstanceField = () => {
    setReceivedSubstances([...receivedSubstances, ''])
  }

  // Handles changes in the substances fields
  const handleSubstanceChange = (index: number, value: string) => {
    const newSubstances = [...receivedSubstances]
    newSubstances[index] = value
    setReceivedSubstances(newSubstances)
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
      receivedSubstances.some((substance) => substance === '') ||
      !pharmacy ||
      !crossStreets ||
      !phoneNumber ||
      !patientSignature ||
      !witnessSignature ||
      !date ||
      !amaEmployeeInitials ||
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
      receivedSubstances,
      pharmacy,
      crossStreets,
      phoneNumber,
      initials,
      patientSignature,
      witnessSignature,
      date,
      amaEmployeeInitials,
    }
    // Submit the form data to the server/database
    submitControlledSubstance(formData)
      .then(() => {
        toast.success('Form submitted successfully!')

        // Reset form fields to initial state
        setPatientName('')
        setDateOfBirth({ month: '', day: '', year: '' })
        setReceivedSubstances([''])
        setPharmacy('')
        setCrossStreets('')
        setPhoneNumber('')
        setInitials(new Array(12).fill(''))
        setPatientSignature('')
        setWitnessSignature('')
        setDate('')
        setAmaEmployeeInitials('')

        // Delay the sign-out and redirection by 2 seconds
        setTimeout(async () => {
          auth.signOut() // Sign out the user
          router.push('/SubstanceContractThankYou') // Redirect to Thank You page
        }, 1000)
      })
      .catch((error) => {
        toast.error('Error submitting form: ' + error.message)
      })
  }

  return (
    <div>
      <ToastContainer position={'bottom-right'} />
      <Header selectCompany={'AMA'} routePatientsHome={true} />
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
        <h1 className="text-center text-3xl font-bold text-gray-700 mb-6">
          Controlled Substance Contract
        </h1>
        <div className="space-y-4">
          <p className="text-lg text-gray-700">
            I,
            <input
              type="text"
              placeholder="Full Name"
              className="mx-2 p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
            , date of birth
            <input
              type="text"
              placeholder="MM"
              maxLength={2}
              className="mx-1 p-2 w-12 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
              value={dateOfBirth.month}
              onChange={(e) =>
                setDateOfBirth({ ...dateOfBirth, month: e.target.value })
              }
            />
            /
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
            /
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
            , agree to the following conditions of treatment. (Print name
            Clearly)
          </p>
          <p className="font-bold text-gray-700">
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
              {index === 1 && (
                <>
                  {receivedSubstances.map((substance, substanceIndex) => (
                    <input
                      key={substanceIndex}
                      type="text"
                      placeholder="Enter Controlled Substance"
                      className="mx-2 mt-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                      value={substance}
                      onChange={(e) =>
                        handleSubstanceChange(substanceIndex, e.target.value)
                      }
                    />
                  ))}
                  <button
                    onClick={addSubstanceField}
                    className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Add +
                  </button>
                </>
              )}
              {index === 2 && (
                <>
                  <input
                    type="text"
                    placeholder="Pharmacy Name"
                    className="mx-2 mt-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                    value={pharmacy}
                    onChange={(e) => setPharmacy(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Cross Streets"
                    className="mx-2 mt-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                    value={crossStreets}
                    onChange={(e) => setCrossStreets(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="mx-2 mt-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </>
              )}
            </div>
          ))}
          <div className="flex flex-col my-2">
            <input
              type="text"
              placeholder="Patient Signature"
              className="p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
              value={patientSignature}
              onChange={(e) => setPatientSignature(e.target.value)}
            />
            <input
              type="text"
              placeholder="Witness Signature"
              className="p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
              value={witnessSignature}
              onChange={(e) => setWitnessSignature(e.target.value)}
            />
            <input
              type="date"
              className="p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              type="text"
              placeholder="AMA Employee Initials"
              className="p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
              value={amaEmployeeInitials}
              onChange={(e) => setAmaEmployeeInitials(e.target.value)}
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
