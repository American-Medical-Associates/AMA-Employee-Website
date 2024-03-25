import React, { useState } from 'react'
import TextInput from '../../components/userInput/TextInput'
import DateInput from '../../components/userInput/DateInput'
import MainButton from '../../components/Buttons/MainButton'

import { savePatentForms } from '../../firebase/firebase'
import GreenCheckMark from '../../components/formComponents/GreenCheckMark'

const RecordsRequestForm = () => {
  const [facility, setFacility] = useState('')
  const [phone, setPhone] = useState('')
  const [fax, setFax] = useState('')
  const [dob, setDob] = useState('')
  const [apptDate, setApptDate] = useState('')
  const [apptTime, setApptTime] = useState('')

  const [requireFacility, setRequireFacility] = useState(false)
  const [requirePhone, setRequirePhone] = useState(false)
  const [requireFax, setRequireFax] = useState(false)
  const [requireDob, setRequireDob] = useState(false)
  const [requireApptDate, setRequireApptDate] = useState(false)
  const [requireApptTime, setRequireApptTime] = useState(false)
  const [showGreenCheckMark, setShowGreenCheckMark] = useState(false)
  const isFormValid = () => {
    const valid =
      facility.trim() !== '' &&
      phone.trim() !== '' &&
      fax.trim() !== '' &&
      dob.trim() !== '' &&
      apptDate.trim() !== '' &&
      apptTime.trim() !== ''

    setRequireFacility(!valid)
    setRequirePhone(!valid)
    setRequireFax(!valid)
    setRequireDob(!valid)
    setRequireApptDate(!valid)
    setRequireApptTime(!valid)

    return valid
  }
  return (
    <div>
      <main className=" container mx-auto my-[50px]">
        <h1 className="text-center text-3xl">Records Request</h1>
        <div className="mb-5">
          <TextInput
            required={requireFacility}
            id="facility"
            placeHolder="Facility"
            widthPercentage="w-2/3"
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setFacility(text.target.value)
            }}
            value={facility}
          />
        </div>
        <div className="mb-5">
          <TextInput
            required={requirePhone}
            id="phone"
            placeHolder="Phone"
            widthPercentage="w-2/3"
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setPhone(text.target.value)
            }}
            value={phone}
          />
        </div>
        <div className="mb-5">
          <TextInput
            required={requireFax}
            id="fax"
            placeHolder="Fax"
            widthPercentage="w-2/3"
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setFax(text.target.value)
            }}
            value={fax}
          />
        </div>

        <div className="mb-5">
          <DateInput
            required={requireDob}
            id="dob"
            placeHolder="DOB"
            widthPercentage="w-2/3"
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setDob(text.target.value)
            }}
            value={dob}
          />
        </div>
        <div className="mb-5">
          <DateInput
            required={requireApptDate}
            id="apptDate"
            placeHolder="Appt Date"
            widthPercentage="w-2/3"
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setApptDate(text.target.value)
            }}
            value={apptDate}
          />
        </div>
        <div className="mb-5">
          <TextInput
            required={requireApptTime}
            id="apptTime"
            placeHolder="Appt Time"
            widthPercentage="w-2/3"
            onChange={(text: React.ChangeEvent<HTMLInputElement>) => {
              setApptTime(text.target.value)
            }}
            value={apptTime}
          />
        </div>
        <div className="text-center">
          {showGreenCheckMark && (
            <GreenCheckMark
              checkMarkText="Thank You"
              bottomText="Your information has been submitted"
            />
          )}
          <MainButton
            buttonWidth="w-1/2"
            buttonText="Submit"
            onClick={() => {
              savePatentForms({
                formName: 'RecordsRequest',
                facility,
                phone,
                fax,
                dob,
                apptDate,
                apptTime,
              }).then(() => {
                setShowGreenCheckMark(true)
              })
            }}
          />
        </div>
      </main>
    </div>
  )
}

export default RecordsRequestForm
