import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import PhoneNumberInput from '../components/PhoneNumberInput'
import Datepicker from '../components/Datepicker'
import { TimeSelector } from '../components/formComponents/TimeSelector'
import MainButton from '../components/MainButton'
import LargeTextBox from '../components/LargeTextBox'
import { BookAnAppointment } from '../firebase'
import { auth, functions } from '../firebase'
import { httpsCallable, getFunctions } from 'firebase/functions'

const vitalizeBookAnAppointment: NextPage<{}> = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const sendMessageFunction = httpsCallable(functions, 'sendMessage')
  //console.log date
  useEffect(() => {
    console.log(date.getDay())
  }, [date])
  //convert time to 12 hour format

  const convertTime = (time: string) => {
    let hours = parseInt(time.split(':')[0])
    let minutes = parseInt(time.split(':')[1])
    let ampm = hours >= 12 ? 'pm' : 'am'
    hours = hours % 12
    hours = hours ? hours : 12
    minutes = minutes < 10 ? 0 + minutes : minutes
    let strTime = hours + ':' + minutes + ' ' + ampm
    return strTime
  }

  return (
    <div className=" mb-10">
      <Header selectCompany={'Vitalize'} />
      <main className=" flex flex-col items-center  justify-center p-5 ">
        <h1 className=" text-xl">Book an Appointment</h1>
        <TextInput
          placeHolder="First Name"
          widthPercentage="w-1/2"
          onChange={(text: any) => {
            setFirstName(text.target.value)
          }}
          value={firstName}
        />
        <TextInput
          placeHolder="Last Name"
          widthPercentage="w-1/2"
          onChange={(text: any) => {
            setLastName(text.target.value)
          }}
          value={lastName}
        />
        <PhoneNumberInput
          placeHolder="Phone Number"
          widthPercentage="w-1/2"
          onChange={(text: any) => {
            setPhoneNumber(text.target.value)
          }}
          value={phoneNumber}
        />
        <TextInput
          placeHolder="Email"
          widthPercentage="w-1/2"
          onChange={(text: any) => {
            setEmail(text.target.value)
          }}
          value={email}
        />
        <LargeTextBox
          placeHolder="Message(optional)"
          widthPercentage="w-1/2"
          onChange={(text: any) => {
            setMessage(text.target.value)
          }}
          value={message}
        />
        <p className="my-5">We are open on every day besides sundays</p>
        <Datepicker selectedDate={date} setSelectedDate={setDate} />
        <p className=" my-3">Select a time between 9:00am and 4:30pm Mon-Fri</p>
        <p>For Saturdays please select a time between 10:00am an 2:30pm</p>
        <TimeSelector setTime={setTime} time={time} />

        <p>For any questions call 480-590-5075</p>
        <MainButton
          buttonText="Book Appointment"
          buttonWidth="w-1/2"
          onClick={() => {
            //if time is before 9am or after 5pm, show error message
            //if date is before today, show error message
            // if date is on a sunday, show error message

            if (
              date.getDate() < new Date().getDate() &&
              date.getMonth() <= new Date().getMonth() &&
              date.getFullYear() <= new Date().getFullYear()
            ) {
              alert('Please select a date that is not in the past')
            } else if (date.getDay() === 0) {
              alert('Please select a date that is not a Sunday')
            } else if (
              time < '10:00' ||
              (time > '14:30' && date.getDay() === 6)
            ) {
              alert('Please select a time between 10am and 2:30pm on saturdays')
            } else if (time < '09:00' || time > '16:30') {
              alert('Please select a time between 9am and 4:30pm')
              setTime('')
            } else {
              if (
                firstName === '' ||
                lastName === '' ||
                phoneNumber === '' ||
                email === '' ||
                time === ''
              ) {
                alert('Please fill out all fields')
              } else {
                BookAnAppointment({
                  firstName: firstName,
                  lastName: lastName,
                  phoneNumber: phoneNumber,
                  email: email,
                  date: date,
                  time: time,
                  message: message,
                })
                alert('Appointment Booked')
                // sendMessageFunction({
                //   message: `${firstName} ${lastName} Booked an appointment from facebook add for ${date} at ${time}`,
                //   phone: '+16024482542',
                // })
                // sendMessageFunction({
                //   message: `${firstName} ${lastName} Booked an appointment from facebook add for ${date} at ${time}`,
                //   phone: '+14806006604',
                // })
                sendMessageFunction({
                  message: `${firstName} ${lastName} Booked an appointment from facebook add for ${date} at ${time}`,
                  phone: '+16233133383',
                })

                //claear all fields
                setFirstName('')
                setLastName('')
                setPhoneNumber('')
                setEmail('')
                setDate(new Date())
                setTime('')
                setMessage('')
                setIsSubmitted(true)
              }
            }
          }}
        />
      </main>
    </div>
  )
}
export default vitalizeBookAnAppointment
