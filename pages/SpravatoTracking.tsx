import { NextPage } from 'next'
import React, { useState } from 'react'
import Datepicker from '../components/Datepicker'
import Header from '../components/Header'
import MainButton from '../components/MainButton'
import TextInput from '../components/TextInput'
import { addSpravatoTracking } from '../firebase'
import DateInput from '../components/DateInput'
import PhoneNumberInput from '../components/PhoneNumberInput'
import { useRouter } from 'next/router'

const SpravatoTracking: NextPage<{}> = () => {
  const router = useRouter()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [DOB, setDOB] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [dose, setDose] = useState('')
  const [dateOrdered, setDateOrdered] = useState(new Date())
  const [numberOfDevices, setNumberOfDevices] = useState('')
  const [dateReceived, setDateReceived] = useState(new Date())
  const [dateAdministered, setDateAdministered] = useState(new Date())
  const [Ma, setMa] = useState('')
  //ma as mulitiple choice
  return (
    <div>
      <Header />
      <main className=" mt-10">
        <div className="flex flex-col items-center justify-center">
          <TextInput
            placeHolder="First Name"
            widthPercentage="w-[60%]"
            value={firstName}
            onChange={(text: any) => {
              setFirstName(text.target.value)
            }}
          />
          <TextInput
            placeHolder="Last Name"
            widthPercentage="w-[60%]"
            value={lastName}
            onChange={(text: any) => {
              setLastName(text.target.value)
            }}
          />
          <DateInput
            placeHolder="DOB"
            widthPercentage="w-[60%]"
            value={DOB}
            onChange={(text: any) => {
              setDOB(text.target.value)
            }}
          />

          <PhoneNumberInput
            placeHolder="Patient Phone Number"
            widthPercentage="w-[60%]"
            value={phoneNumber}
            onChange={(text: any) => {
              setPhoneNumber(text.target.value)
            }}
          />
          <TextInput
            placeHolder="Email"
            widthPercentage="w-[60%]"
            value={email}
            onChange={(text: any) => {
              setEmail(text.target.value)
            }}
          />

          <div className=" my-10">
            <h4 className=" mb-5 text-center">Date Ordered</h4>
            <Datepicker
              selectedDate={dateOrdered}
              setSelectedDate={setDateOrdered}
            />
          </div>
          <TextInput
            placeHolder="Number of Devices"
            widthPercentage="w-[60%]"
            value={numberOfDevices}
            onChange={(text: any) => {
              setNumberOfDevices(text.target.value)
            }}
          />
          <div className=" my-10">
            <h4 className=" mb-5 text-center">Date Received</h4>
            <Datepicker
              selectedDate={dateReceived}
              setSelectedDate={setDateReceived}
            />
          </div>
          <TextInput
            placeHolder="Dose"
            widthPercentage="w-[60%]"
            value={dose}
            onChange={(text: any) => {
              setDose(text.target.value)
            }}
          />
          <div className=" my-10">
            <h4 className=" mb-5 text-center">Date Administered</h4>
            <Datepicker
              selectedDate={dateAdministered}
              setSelectedDate={setDateAdministered}
            />
          </div>

          <TextInput
            placeHolder="MA"
            widthPercentage="w-[60%]"
            value={Ma}
            onChange={(text: any) => {
              setMa(text.target.value)
            }}
          />
          <div>
            <MainButton
              buttonText="Add Spravato Tracking"
              onClick={() => {
                if (
                  firstName == '' ||
                  lastName == '' ||
                  DOB == '' ||
                  phoneNumber == '' ||
                  email == '' ||
                  dose == '' ||
                  numberOfDevices == '' ||
                  Ma == ''
                ) {
                  alert('Please make sure all felids are filled out.')
                }
                addSpravatoTracking({
                  email: email,
                  MA: Ma,
                  dateAdministered: dateAdministered,
                  dateReceived: dateReceived,
                  dose: dose,
                  dateOrdered: dateOrdered,
                  firstName: firstName,
                  lastName: lastName,
                  DOB: DOB,
                  phoneNumber: phoneNumber,
                  numberOfDevices: numberOfDevices,
                })
                  .then(() => {
                    setEmail('')
                    setMa('')
                    setDose('')
                    setFirstName('')
                    setLastName('')
                    setDOB('')
                    setPhoneNumber('')
                    setNumberOfDevices('')
                  })
                  .then(() => {
                    router.push('/Spravato')
                  })
              }}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
export default SpravatoTracking
