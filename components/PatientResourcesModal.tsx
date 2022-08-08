import React, { useState } from 'react'
import { XIcon, UserAddIcon } from '@heroicons/react/outline'
import SearchComponent from './searchComponent'
import DateInput from './DateInput'
import TextInput from './TextInput'
import PhoneNumberInput from './PhoneNumberInput'
import MainButton from './MainButton'
import { addNewPatient } from '../firebase'

const PatientResourcesModal: React.FC<{ setClose: any }> = ({ setClose }) => {
  const [showAddNewUser, setShowAddNewUser] = useState(false)
  const [searchName, setSearchName] = useState('')
  const [searchDob, setSearchDob] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [DOB, setDOB] = useState('')

  const showAddPatientOrSearch = () => {
    if (showAddNewUser == false) {
      return (
        <div className=" flex h-[85%] flex-col items-center justify-center">
          <div className=" flex h-full w-full flex-row items-start justify-center p-5 ">
            <div className=" mx-10">
              <TextInput
                value={searchName}
                onChange={(text: any) => {
                  setSearchName(text.target.value)
                }}
                placeHolder="Name"
              />
            </div>

            <div className=" mx-10">
              <DateInput
                placeHolder="DOB"
                value={searchDob}
                onChange={(text: any) => {
                  setSearchDob(text.target.value)
                }}
              />
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className=" text-center">
          <div className=" flex-rows flex h-[85%] grid-cols-2">
            <div className=" w-full">
              <div>
                <TextInput
                  value={lastName}
                  onChange={(text: any) => {
                    setLastName(text.target.value)
                  }}
                  placeHolder="Last Name"
                />
              </div>
              <div className=" mt-10">
                <DateInput
                  value={DOB}
                  onChange={(text: any) => {
                    setDOB(text.target.value)
                  }}
                  placeHolder="DOB"
                />
              </div>
              <div className=" mt-10">
                <TextInput
                  value={email}
                  onChange={(text: any) => {
                    setEmail(text.target.value)
                  }}
                  placeHolder="Email"
                />
              </div>
            </div>
            <div className=" w-full">
              <TextInput
                value={firstName}
                onChange={(text: any) => {
                  setFirstName(text.target.value)
                }}
                placeHolder="First Name"
              />
              <div className=" mt-10">
                <PhoneNumberInput
                  value={phoneNumber}
                  onChange={(text: any) => {
                    setPhoneNumber(text.target.value)
                  }}
                  placeHolder="Phone Number"
                />
              </div>
              <div className=" mt-10">
                <TextInput
                  value={address}
                  onChange={(text: any) => {
                    setAddress(text.target.value)
                  }}
                  placeHolder="Address"
                />
              </div>
            </div>
          </div>

          <MainButton
            onClick={() => {
              addNewPatient({
                email: email,
                lastName: lastName,
                firstName: firstName,
                DOB: DOB,
                phoneNumber: phoneNumber,
                address: address,
              })
              setEmail('')
              setFirstName('')
              setLastName('')
              setPhoneNumber('')
              setAddress('')
              setAddress('')
              setDOB('')
            }}
            buttonText="Add patient"
          />
        </div>
      )
    }
  }

  return (
    <div className="fixed flex h-[100vh] w-full translate-y-[-13%] items-center justify-center bg-[#dcdcdcac]">
      <div className=" h-[70%] w-[60%] rounded-[30px] bg-[#ffffff] shadow-2xl ">
        <div className="flex h-[15%] grid-rows-3 flex-row  rounded-tr-[30px] rounded-tl-[30px] bg-[#76a3ff] ">
          <div className=" mx-10 mt-5 w-full">
            <UserAddIcon
              onClick={() => {
                setShowAddNewUser(!showAddNewUser)
              }}
              className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in"
            />
          </div>
          <div className=" mx-10 mt-5 w-full text-center text-2xl">
            Patients
          </div>
          <div className=" mx-10 mt-5 flex w-full justify-end">
            <XIcon
              onClick={() => {
                setClose(false)
              }}
              className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in"
            />
          </div>
        </div>
        {showAddPatientOrSearch()}
      </div>
    </div>
  )
}
export default PatientResourcesModal
