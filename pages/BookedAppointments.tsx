import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import Header from '../components/Header'
import { auth, GetBookedAppointments } from '../firebase'
import router from 'next/router'
const BookedAppointments: NextPage<{}> = () => {
  const [appointments, setAppointments] = useState<Array<any>>([])
  useEffect(() => {
    GetBookedAppointments({
      BookedAppointmentsState: setAppointments,
    })
  }, [])

  useEffect(() => {
    if (!auth.currentUser?.email) {
      router.push('/PatientLogin')
    }
  }, [])

  const listOfAppointments = appointments.map(
    (appointment: any, index: any) => {
      // item.map((appointment: any, index: any) => {
      // make appointment.time into a 12 hour clock
      const time = appointment.time
      const timeArray = time.split(':')
      const hour = timeArray[0]
      const minutes = timeArray[1]
      const ampm = hour >= 12 ? 'pm' : 'am'
      const hour12 = hour % 12 || 12
      const time12 = hour12 + ':' + minutes + ' ' + ampm

      return (
        <div
          key={index}
          className={
            'my-5 flex w-[50%] flex-col items-center rounded-[30px] bg-[#e7e7e7d4]  p-5'
          }
        >
          <p className=" my-3">
            <span className="font-semibold">First Name: </span>
            {appointment.firstName}
          </p>
          <p className=" my-3">
            <span className="font-semibold">Last Name: </span>
            {appointment.lastName}
          </p>
          <p className=" my-3">
            <span className="font-semibold">Email: </span>
            {appointment.email}
          </p>
          <p className=" my-3">
            <span className="font-semibold">Phone Number: </span>
            {appointment.phoneNumber}
          </p>
          {/* <p>{appointment.date}</p> */}
          <p className=" my-3">
            <span className="font-semibold">Time: </span>
            {time12}
          </p>
          <p className=" my-3">
            <span className="font-semibold">Date: </span>
            {appointment.date.toDate().toDateString()}
          </p>
          <p className=" my-3">
            <span className="font-semibold">Message: </span>
            {appointment.message}
          </p>
        </div>
      )
      // })
    }
  )

  return (
    <div className=" flex h-full w-full flex-col items-center justify-center">
      <Header selectCompany={'Vitalize'} routePatientsHome={false} />
      <main className="flex h-full w-full flex-col items-center justify-center p-10">
        <h1 className="text-2xl">Booked Appointments</h1>
        <div className=" my-10 flex w-full  flex-col items-center  justify-start  ">
          {listOfAppointments}
        </div>
        <div>
          <h3>Calender Coming Soon</h3>
        </div>
      </main>
    </div>
  )
}
export default BookedAppointments
