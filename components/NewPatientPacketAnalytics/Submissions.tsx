import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { auth } from '../../firebase/firebase'
import { MenuItem } from '../navigation/MenuItem'
import { UserIcon } from '@heroicons/react/24/outline'
import Datepicker from '../userInput/Datepicker'
import BarGraph from '../GraphComponents/BarGraph'
import { GetNewPatientPacketSubmissions } from '../../firebase/firebase'

const Submissions: React.FC<{ selectedDate: Date }> = ({ selectedDate }) => {
  const [NewPatientPacketAnalyticsArray, setNewPatientPacketAnalyticsArray] =
    useState<Array<any>>([])
  const [day, setDay] = useState(true)
  const [week, setWeek] = useState(false)
  const [month, setMonth] = useState(false)
  const [year, setYear] = useState(false)
  const [all, setAll] = useState(false)
  const [numberOfNewPatientPackets, setNewPatientPackets] = useState(true)

  const router = useRouter()
  useEffect(() => {
    if (!auth.currentUser?.email) {
      router.push('/Login')
    }
  }, [])
  var totalDayNumber = 0
  const PickedDate = (month: any) => {
    if (day) {
      switch (month.getMonth()) {
        case 0:
          return 'January'
        case 1:
          return 'February'
        case 2:
          return 'March'
        case 3:
          return 'April'
        case 4:
          return 'May'
        case 5:
          return 'June'
        case 6:
          return 'July'
        case 7:
          return 'August'
        case 8:
          return 'September'
        case 9:
          return 'October'
        case 10:
          return 'November'
        case 11:
          return 'December'
        default:
          return 'Pick a month'
      }
    }
    if (month) {
      return month.getFullYear()
    }
    if (all) {
      return 'All'
    }
  }
  useEffect(() => {
    return () => {
      GetNewPatientPacketSubmissions({
        company: 'AMA',
        NewPatientPacketsState: setNewPatientPacketAnalyticsArray,
        archived: true,
        setLoading: () => { },
        start: new Date('2021-01-01'),
        end: new Date('2022-01-01'),
      })
    }
  }, [month, year, all, day, week])

  const daysInMonth = new Date(
    new Date().getFullYear(),
    selectedDate.getMonth() + 1,
    0,
  ).getDate()

  const daysInMonthArray = []
  for (let i = 0; i < daysInMonth; i++) {
    daysInMonthArray.push(i + 1)
  }
  const monthsInYear = []
  for (let i = 0; i < 12; i++) {
    monthsInYear.push(i + 1)
  }
  const yearsTotal: any = []
  for (let i = 0; i < NewPatientPacketAnalyticsArray.length; i++) {
    if (
      !yearsTotal.includes(
        NewPatientPacketAnalyticsArray[i].dateAdded
          .toDate()
          .toDateString()
          .split(' ')[3],
      )
    ) {
      yearsTotal.push(
        NewPatientPacketAnalyticsArray[i].dateAdded
          .toDate()
          .toDateString()
          .split(' ')[3],
      )
    }
  }
  var data: any = null

  if (day) {
    totalDayNumber = 0
    data = daysInMonthArray.map((day: any) => {
      var dayNumber = 0
      //1.get the number of spravatos for every day in the month and display it on the graph
      NewPatientPacketAnalyticsArray.map((NewPatientPacket) => {
        if (
          NewPatientPacket.dateAdded.toDate().getDate() == day &&
          NewPatientPacket.dateAdded.toDate().getMonth() + 1 ==
          selectedDate.getMonth() + 1
        ) {
          dayNumber = dayNumber + 1
          totalDayNumber = totalDayNumber + 1
        }
      })

      return {
        date: day,
        Number_Of_Tickets: dayNumber,
      }
    })
  }
  if (month) {
    totalDayNumber = 0
    data = monthsInYear.map((month: any) => {
      var monthNumber = 0
      //1.get the number of spravatos for every day in the month and display it on the graph
      NewPatientPacketAnalyticsArray.map((NewPatientPacket) => {
        if (
          NewPatientPacket.dateAdded.toDate().getMonth() + 1 == month &&
          NewPatientPacket.dateAdded.toDate().getFullYear() ==
          selectedDate.getFullYear()
        ) {
          monthNumber = monthNumber + 1
          totalDayNumber = totalDayNumber + 1
        }
      })

      return {
        date: month,
        Number_Of_Tickets: monthNumber,
      }
    })
  }
  if (all) {
    totalDayNumber = 0
    data = yearsTotal.map((year: any) => {
      var monthNumber = 0
      //1.get the number of spravatos for every day in the month and display it on the graph
      NewPatientPacketAnalyticsArray.map((NewPatientPacket) => {
        if (NewPatientPacket.dateAdded.toDate().getFullYear() == year) {
          monthNumber = monthNumber + 1
          totalDayNumber = totalDayNumber + 1
        }
      })

      return {
        date: year,
        Number_Of_Tickets: monthNumber,
      }
    })
  }
  return (
    <div>
      <div className="flex flex-col">
        <div className="flex h-[80vh] flex-col">
          <div className="flex flex-row p-10 ">
            <div className=" mr-5 flex w-[20%] flex-col">
              {/* <MenuItem
                icon={
                  <UserIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                }
                text="Number of Spravatos "
                onClick={() => {
                  setNumberOfSupportTickets(true)
                }}
              /> */}
              {/* <MenuItem
                icon={
                  <UserIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                }
                text="MA's Spravato Percentage"
                onClick={() => {
                  setmaSpravatoPercentage(true), setNumberOfSpravatos(false)
                }}
              /> */}
              {/* <MenuItem
                icon={
                  <UserIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                }
                text="MostS"
                onClick={() => {}}
              /> */}
            </div>
            <div className="flex w-[75%] flex-col items-center justify-center">
              {numberOfNewPatientPackets &&
                data != undefined &&
                data != null && (
                  //@ts-ignore
                  <BarGraph
                    data={data}
                    day={day}
                    week={week}
                    month={month}
                    year={year}
                    all={all}
                    setDay={setDay}
                    setWeek={setWeek}
                    setMonth={setMonth}
                    setYear={setYear}
                    setAll={setAll}
                    curentTimeFrame={PickedDate(selectedDate)}
                    totalForTimeFrame={totalDayNumber}
                    toolTipText="Number_Of_Tickets"
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Submissions
