import React, { useState, useEffect } from 'react'
import { auth, submitPatientReleaseForm } from '../firebase/firebase'
import TextInput from '../components/userInput/TextInput'
import CustomCheckBoxField from '../components/formComponents/CustomCheckBoxField'
import MainButton from '../components/Buttons/MainButton'
import DateInput from '../components/userInput/DateInput'
import { useRouter } from 'next/router'

const formatDate = (date: string | number | Date) => {
  const d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  return [month.padStart(2, '0'), day.padStart(2, '0'), year].join('/')
}

function PatientReleaseForm() {
  const [patientName, setPatientName] = useState('')
  const [requiredPatientName, setRequiredPatientName] = useState(false)
  const [patientDOB, setPatientDOB] = useState('')
  const [requiredPatientDOB, setRequiredPatientDOB] = useState(false)
  const [lastFourSSN, setLastFourSSN] = useState('')
  const [requiredLastFourSSN, setRequiredLastFourSSN] = useState(false)
  const [patientStreetAddress, setPatientStreetAddress] = useState('')
  const [requiredPatientStreetAddress, setRequiredPatientStreetAddress] =
    useState(false)
  const [patientCity, setPatientCity] = useState('')
  const [requiredPatientCity, setRequiredPatientCity] = useState(false)
  const [patientApt, setPatientApt] = useState('')
  const [patientState, setPatientState] = useState('')
  const [requiredPatientState, setRequiredPatientState] = useState(false)
  const [patientZip, setPatientZip] = useState('')
  const [requiredPatientZip, setRequiredPatientZip] = useState(false)
  const [patientPhone, setPatientPhone] = useState('')
  const [requiredPatientPhone, setRequiredPatientPhone] = useState(false)
  const [purposeOfRelease, setPurposeOfRelease] = useState('')
  const [requiredPurposeOfRelease, setRequiredPurposeOfRelease] =
    useState(false)
  const [treatmentFrom, setTreatmentFrom] = useState('')
  const [requiredTreatmentFrom, setRequiredTreatmentFrom] = useState(false)
  const [treatmentTo, setTreatmentTo] = useState('')
  const [requiredTreatmentTo, setRequiredTreatmentTo] = useState(false)
  const [facilityName, setFacilityName] = useState('')
  const [requiredFacilityName, setRequiredFacilityName] = useState(false)
  const [facilityAddress, setFacilityAddress] = useState('')
  const [requiredFacilityAddress, setRequiredFacilityAddress] = useState(false)
  const [facilityPhone, setFacilityPhone] = useState('')
  const [requiredFacilityPhone, setRequiredFacilityPhone] = useState(false)
  const [facilityFax, setFacilityFax] = useState('')
  const [nameOfPractice, setNameOfPractice] = useState(
    'American Medical Associates',
  )
  const [addressOfPractice, setAddressOfPractice] = useState(
    '1915 E. Chandler Blvd, Suite 1, Chandler, AZ 85225',
  )
  const [practicePhone, setPracticePhone] = useState('(480) 306-5151')
  const [practiceFax, setPracticeFax] = useState('(480) 306-4648')
  const [hospital, setHospital] = useState('')
  const [requiredHospital, setRequiredHospital] = useState(false)
  const [officeClinic, setOfficeClinic] = useState('')
  const [requiredOfficeClinic, setRequiredOfficeClinic] = useState(false)
  const [format, setFormat] = useState('')
  const [requiredFormat, setRequiredFormat] = useState(false)
  const [deliveryMethod, setDeliveryMethod] = useState('')
  const [requiredDeliveryMethod, setRequiredDeliveryMethod] = useState(false)
  const [patientSignature, setPatientSignature] = useState('')
  const [requiredPatientSignature, setRequiredPatientSignature] =
    useState(false)
  const [legalGuardianSignature, setLegalGuardianSignature] = useState('')
  const [relationshipToPatient, setRelationshipToPatient] = useState('')
  const [dateOfRequest, setDateOfRequest] = useState(formatDate(new Date()))
  const [date, setDate] = useState(formatDate(new Date()))
  const [requiredDate, setRequiredDate] = useState(false)

  const router = useRouter()

  useEffect(() => {
    if (!auth.currentUser?.email) {
      router.push('/PatientLogin')
    }
  }, [])

  const handleSubmit = () => {
    submitPatientReleaseForm({
      patientName,
      patientDOB,
      lastFourSSN,
      patientStreetAddress,
      patientCity,
      patientState,
      patientZip,
      patientPhone,
      purposeOfRelease,
      treatmentFrom,
      treatmentTo,
      facilityName,
      facilityAddress,
      facilityPhone,
      facilityFax,
      nameOfPractice,
      addressOfPractice,
      practicePhone,
      practiceFax,
      hospital,
      officeClinic,
      format,
      deliveryMethod,
      patientSignature,
      legalGuardianSignature,
      relationshipToPatient,
      dateOfRequest,
      date,
    })
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Authorization To Release Protected Health Information
        </h1>
        <h2 className="text-xl font-semibold text-gray-700 text-center mb-6">
          I give permission to release the health information of: (One patient
          per form/ one facility per form)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <TextInput
            id="patientName"
            placeHolder="Patient's Full Name"
            widthPercentage="w-full"
            value={patientName}
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setPatientName(text.target.value)
            }}
            required={requiredPatientName}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <DateInput
            id="patientDOB"
            placeHolder="Patient's Date of Birth"
            widthPercentage="w-full"
            value={patientDOB}
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setPatientDOB(text.target.value)
            }}
            required={requiredPatientDOB}
          />
          <TextInput
            id="lastFourSSN"
            placeHolder="Last 4 numbers of Social Security Number"
            widthPercentage="w-full"
            value={lastFourSSN}
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setLastFourSSN(text.target.value)
            }}
            required={requiredLastFourSSN}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <TextInput
            id="patientAddress"
            placeHolder="Address"
            widthPercentage="w-full"
            value={patientStreetAddress}
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setPatientStreetAddress(text.target.value)
            }}
            required={requiredPatientStreetAddress}
          />
          <TextInput
            id="patientApt"
            placeHolder="Apt/Unit/Lot #"
            widthPercentage="w-full"
            value={patientApt}
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setPatientApt(text.target.value)
            }}
          />
          <TextInput
            id="patientCity"
            placeHolder="City"
            widthPercentage="w-full"
            value={patientCity}
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setPatientCity(text.target.value)
            }}
            required={requiredPatientCity}
          />
          <TextInput
            id="patientState"
            placeHolder="State"
            widthPercentage="w-full"
            value={patientState}
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setPatientState(text.target.value)
            }}
            required={requiredPatientState}
          />
          <TextInput
            id="patientZip"
            placeHolder="Zip"
            widthPercentage="w-full"
            value={patientZip}
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setPatientZip(text.target.value)
            }}
            required={requiredPatientZip}
          />
        </div>
        <div className="mb-6">
          <TextInput
            id="patientPhone"
            placeHolder="Phone"
            widthPercentage="w-full"
            value={patientPhone}
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setPatientPhone(text.target.value)
            }}
            required={requiredPatientPhone}
          />
        </div>
        <div className="mb-6">
          <CustomCheckBoxField
            title="Purpose of Release"
            key={'purposeOfRelease'}
            id="purposeOfRelease"
            checkBoxValues={purposeOfRelease}
            setCheckBoxValues={setPurposeOfRelease}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={[
              'Patient Use',
              'Insurance',
              'Disability',
              'Workers Compensation',
              'Legal Purposes',
              'Further Medical Care',
              'Other',
            ]}
            required={requiredPurposeOfRelease}
          />
        </div>
        <p className="text-lg font-semibold text-gray-700 mb-4">
          Treatment Dates
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <DateInput
            id="treatmentFrom"
            placeHolder="From"
            widthPercentage="w-full"
            value={treatmentFrom}
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setTreatmentFrom(text.target.value)
            }}
            required={requiredTreatmentFrom}
          />
          <DateInput
            id="treatmentTo"
            placeHolder="To"
            widthPercentage="w-full"
            value={treatmentTo}
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setTreatmentTo(text.target.value)
            }}
            required={requiredTreatmentTo}
          />
        </div>
        <p className="text-lg font-semibold text-gray-700 mb-4">
          Release Information From
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <TextInput
            id="facilityName"
            placeHolder="Facility Name"
            widthPercentage="w-full"
            value={facilityName}
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setFacilityName(text.target.value)
            }}
            required={requiredFacilityName}
          />
          <TextInput
            id="facilityAddress"
            placeHolder="Facility Address"
            widthPercentage="w-full"
            value={facilityAddress}
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setFacilityAddress(text.target.value)
            }}
            required={requiredFacilityAddress}
          />
          <TextInput
            id="facilityPhone"
            placeHolder="Facility Phone"
            widthPercentage="w-full"
            value={facilityPhone}
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setFacilityPhone(text.target.value)
            }}
            required={requiredFacilityPhone}
          />
          <TextInput
            id="facilityFax"
            placeHolder="Facility Fax"
            widthPercentage="w-full"
            value={facilityFax}
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setFacilityFax(text.target.value)
            }}
          />
        </div>
        <p className="text-lg font-semibold text-gray-700 mb-4">
          Release Information To
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <TextInput
            id="nameOfPractice"
            placeHolder="Name of Practice"
            widthPercentage="w-full"
            value={nameOfPractice}
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setNameOfPractice(text.target.value)
            }}
          />
          <TextInput
            id="addressOfPractice"
            placeHolder="Address of Practice"
            widthPercentage="w-full"
            value={addressOfPractice}
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setAddressOfPractice(text.target.value)
            }}
          />
          <TextInput
            id="practicePhone"
            placeHolder="Practice Phone"
            widthPercentage="w-full"
            value={practicePhone}
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setPracticePhone(text.target.value)
            }}
          />
          <TextInput
            id="practiceFax"
            placeHolder="Practice Fax"
            widthPercentage="w-full"
            value={practiceFax}
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setPracticeFax(text.target.value)
            }}
          />
        </div>
        <div className="mb-6">
          <CustomCheckBoxField
            title="Hospital (Check all that may apply)"
            key={'hospital'}
            id="hospital"
            checkBoxValues={hospital}
            setCheckBoxValues={setHospital}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={[
              'History & Physical',
              'Discharge Summary',
              'Operative Report',
              'Consultation Report',
              'Diagnostic Results',
              'Medications',
              'Allergies',
              'Physicians Orders',
              'Progress Notes',
              'Emergency Record',
              'Cardiac Reports / EKG',
              'Laboratory Reports',
              'Radiology Reports',
              'Pathology Reports',
              'Billing Information',
              'Entire Record',
              'Other',
            ]}
            required={requiredHospital}
          />
        </div>
        <div className="mb-6">
          <CustomCheckBoxField
            title="Office / Clinic (Check all that may apply)"
            key={'officeClinic'}
            id="officeClinic"
            checkBoxValues={officeClinic}
            setCheckBoxValues={setOfficeClinic}
            allowMultipleCheckBoxes={true}
            checkBoxTitles={[
              'Office / Clinic Abstract',
              'Office Visits',
              'Physical Exam',
              'Consultation Reports',
              'Diagnostic Test Results',
              'Laboratory Reports',
              'Radiology Reports',
              'Medications',
              'Billing Information',
              'Entire Record',
              'Other',
            ]}
            required={requiredOfficeClinic}
          />
        </div>
        <div className="mb-6">
          <CustomCheckBoxField
            title="Format (Only select one)"
            key={'format'}
            id="format"
            checkBoxValues={format}
            setCheckBoxValues={setFormat}
            allowMultipleCheckBoxes={false}
            checkBoxTitles={[
              'Paper Copy (charges may apply)',
              'Electronic Copy',
              'CD (PDF viewer, charges may apply)',
              'Other',
            ]}
            required={requiredFormat}
          />
        </div>
        <div className="mb-6">
          <CustomCheckBoxField
            title="Delivery Method (Only select one)"
            key={'deliveryMethod'}
            id="deliveryMethod"
            checkBoxValues={deliveryMethod}
            setCheckBoxValues={setDeliveryMethod}
            allowMultipleCheckBoxes={false}
            checkBoxTitles={['Registered US Mail', 'Pick Up', 'Fax', 'Other']}
            required={requiredDeliveryMethod}
          />
        </div>
        <div className="mb-6">
          <p className="text-lg font-semibold text-gray-700 mb-2">
            I Understand That:
          </p>
          <ul className="list-disc pl-6">
            <li className="text-gray-600 mb-2">
              I can cancel this permission at any time. I must cancel in writing
              and send or deliver cancellation to releasing facility or practice
              named above. Any cancellation will apply only to information not
              yet released by facility or practice.
            </li>
            <li className="text-gray-600 mb-2">
              This is a full release including information related to behavioral
              / mental health, drug and alcohol abuse treatment (in compliance
              with 42 FR Part 2), genetic information, HIV / AIDS, and other
              sexually transmitted diseases, unless limited by the above
              selections.
            </li>
            <li className="text-gray-600 mb-2">
              Refusing to sign this form will not prevent my ability to receive
              treatment.
            </li>
            <li className="text-gray-600 mb-2">
              I have a right to receive a copy of this form upon request.
            </li>
          </ul>
        </div>
        <div className="mb-6">
          <p className="text-lg font-semibold text-gray-700 mb-2">
            This permission expires go days after the date of my signature
            unless another date or event is written here:
          </p>
          <TextInput
            id="dateOfRequest"
            placeHolder="Date of Request"
            widthPercentage="w-full"
            value={dateOfRequest}
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setDateOfRequest(text.target.value)
            }}
          />
        </div>
        <div className="mb-6">
          <p className="text-lg font-semibold text-gray-700 mb-2">
            Patient Signature
          </p>
          <TextInput
            id="patientSignature"
            placeHolder="Full Name of Patient"
            widthPercentage="w-full"
            value={patientSignature}
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setPatientSignature(text.target.value)
            }}
            required={requiredPatientSignature}
          />
          <p className="text-lg font-semibold text-gray-700 mb-2 mt-4">Date</p>
          <DateInput
            id="date"
            placeHolder="Date"
            widthPercentage="w-full"
            value={date}
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setDate(text.target.value)
            }}
            required={requiredDate}
          />
        </div>
        <div className="mb-6">
          <p className="text-lg font-semibold text-gray-700 mb-2">
            Legal Guardian Signature
          </p>
          <TextInput
            id="legalGuardianSignature"
            placeHolder="Full Name of Legal Guardian"
            widthPercentage="w-full"
            value={legalGuardianSignature}
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setLegalGuardianSignature(text.target.value)
            }}
          />
          <p className="text-lg font-semibold text-gray-700 mb-2 mt-4">
            Relationship to Patient
          </p>
          <TextInput
            id="relationshipToPatient"
            placeHolder="Relationship to Patient"
            widthPercentage="w-full"
            value={relationshipToPatient}
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setRelationshipToPatient(text.target.value)
            }}
          />
        </div>
        <div className="flex justify-center">
          <MainButton
            buttonText="Submit"
            onClick={() => {
              if (patientName === '') {
                setRequiredPatientName(true)
              } else if (patientDOB === '') {
                setRequiredPatientDOB(true)
              } else if (lastFourSSN === '') {
                setRequiredLastFourSSN(true)
              } else if (patientStreetAddress === '') {
                setRequiredPatientStreetAddress(true)
              } else if (patientCity === '') {
                setRequiredPatientCity(true)
              } else if (patientState === '') {
                setRequiredPatientState(true)
              } else if (patientZip === '') {
                setRequiredPatientZip(true)
              } else if (patientPhone === '') {
                setRequiredPatientPhone(true)
              } else if (purposeOfRelease === '') {
                setRequiredPurposeOfRelease(true)
              } else if (treatmentFrom === '') {
                setRequiredTreatmentFrom(true)
              } else if (treatmentTo === '') {
                setRequiredTreatmentTo(true)
              } else if (facilityName === '') {
                setRequiredFacilityName(true)
              } else if (facilityAddress === '') {
                setRequiredFacilityAddress(true)
              } else if (facilityPhone === '') {
                setRequiredFacilityPhone(true)
              } else if (hospital === '') {
                setRequiredHospital(true)
              } else if (officeClinic === '') {
                setRequiredOfficeClinic(true)
              } else if (format === '') {
                setRequiredFormat(true)
              } else if (deliveryMethod === '') {
                setRequiredDeliveryMethod(true)
              } else if (patientSignature === '') {
                setRequiredPatientSignature(true)
              } else if (date === '') {
                setRequiredDate(true)
              } else {
                handleSubmit()
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default PatientReleaseForm
