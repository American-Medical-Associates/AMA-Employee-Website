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
import {
  BookAnAppointment,
  BookAnAppointmentToTrackUserInput,
} from '../firebase'
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
  const [randomNumber, setRandomNumber] = useState('')
  //console.log date
  useEffect(() => {
    console.log(date.getDay())
  }, [date])
  //convert time to 12 hour format
  useEffect(() => {
    if (randomNumber == '') {
      //random Number
      setRandomNumber(Math.floor(Math.random() * 1000000000).toString())
      //convert to String
    }
  }, [randomNumber])

  return (
    <div className=" mb-10">
      <Header selectCompany={'Vitalize'} />
      <main className=" flex flex-col items-center  justify-center p-5 ">
        <form>
          <h1 className=" text-xl">Book an Appointment</h1>
          <TextInput
            placeHolder="First Name"
            widthPercentage="w-1/2"
            onChange={(text: any) => {
              setFirstName(text.target.value)

              //@ts-ignore
              BookAnAppointmentToTrackUserInput({
                firstName: text.target.value,
                lastName: lastName,

                phoneNumber: phoneNumber,
                email: email,
                date: date,
                time: time,
                message: message,
                randomNumber: randomNumber,
              })
            }}
            value={firstName}
          />
          <TextInput
            placeHolder="Last Name"
            widthPercentage="w-1/2"
            onChange={(text: any) => {
              setLastName(text.target.value)
              BookAnAppointmentToTrackUserInput({
                firstName: firstName,
                lastName: text.target.value,

                phoneNumber: phoneNumber,
                email: email,
                date: date,
                time: time,
                message: message,
                randomNumber: randomNumber,
              })
            }}
            value={lastName}
          />
          <PhoneNumberInput
            placeHolder="Phone Number"
            widthPercentage="w-1/2"
            onChange={(text: any) => {
              setPhoneNumber(text.target.value)
              BookAnAppointmentToTrackUserInput({
                firstName: firstName,
                lastName: lastName,

                phoneNumber: text.target.value,
                email: email,
                date: date,
                time: time,
                message: message,
                randomNumber: randomNumber,
              })
            }}
            value={phoneNumber}
          />
          <TextInput
            placeHolder="Email"
            widthPercentage="w-1/2"
            onChange={(text: any) => {
              setEmail(text.target.value)
              BookAnAppointmentToTrackUserInput({
                firstName: firstName,
                lastName: lastName,

                phoneNumber: phoneNumber,
                email: text.target.value,
                date: date,
                time: time,
                message: message,
                randomNumber: randomNumber,
              })
            }}
            value={email}
          />
          <LargeTextBox
            placeHolder="Message(optional)"
            widthPercentage="w-1/2"
            onChange={(text: any) => {
              setMessage(text.target.value)
              BookAnAppointmentToTrackUserInput({
                firstName: firstName,
                lastName: lastName,

                phoneNumber: phoneNumber,
                email: email,
                date: date,
                time: time,
                message: text.target.value,
                randomNumber: randomNumber,
              })
            }}
            value={message}
          />
          <p className="my-5">We are open on every day besides sundays</p>
          <Datepicker selectedDate={date} setSelectedDate={setDate} />
          <p className=" my-3">
            Select a time between 9:00am and 4:30pm Mon-Fri
          </p>
          <p>For Saturdays please select a time between 10:00am an 2:30pm</p>
          <TimeSelector setTime={setTime} time={time} />
          <p className=" font-semibold">Address:</p>
          <p>1915 E Chandler Blvd, Ste 1, Chandler, AZ 85225</p>

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
                alert(
                  'Please select a time between 10am and 2:30pm on saturdays'
                )
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
                  sendMessageFunction({
                    message: `${firstName} ${lastName} Booked an appointment from facebook add for ${date} at ${time}. There Phone Number is ${phoneNumber} and their email is ${email}. This is the message they left: ${message}`,
                    phone: '+16024482542',
                  })
                  sendMessageFunction({
                    message: `${firstName} ${lastName} Booked an appointment from facebook add for ${date} at ${time}. There Phone Number is ${phoneNumber} and their email is ${email}. This is the message they left: ${message}`,
                    phone: '+14806006604',
                  })
                  sendMessageFunction({
                    message: `${firstName} ${lastName} Booked an appointment from facebook add for ${date} at ${time}. There Phone Number is ${phoneNumber} and their email is ${email}. This is the message they left: ${message}`,
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
        </form>
      </main>
    </div>
  )
}
export default vitalizeBookAnAppointment
