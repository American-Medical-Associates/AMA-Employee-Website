import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import Header from '../components/Header'

import { GetSpravatoTracking } from '../firebase'
import { MenuItem } from '../components/MenuItem'
import { UserIcon } from '@heroicons/react/outline'
import Segment from '../components/GraphComponents/segment'
import BarGraph from '../components/GraphComponents/BarGraph'
import { data } from '@tensorflow/tfjs'
import Datepicker from '../components/Datepicker'
import PieGraph from '../components/GraphComponents/PieGraph'
const SpravtoAnalytics: NextPage<{}> = () => {
  const [spravatoTrackingArray, setSpravatoTrackingArray] = useState<
    Array<any>
  >([])
  const [day, setDay] = useState(true)
  const [week, setWeek] = useState(false)
  const [month, setMonth] = useState(false)
  const [year, setYear] = useState(false)
  const [all, setAll] = useState(false)
  const [listOfMonths, setListOfMonths] = useState<Array<string>>([])
  const [numberOfSpravatos, setNumberOfSpravatos] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [maSpravatoPercentage, setmaSpravatoPercentage] = useState(false)

  var weekNumber = 0
  var monthNumber = 0
  var yearNumber = 0
  var allNumber = 0
  var totalDayNumber = 0
  //get spravto analytics data
  //function to convert the current month number to month name
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
      GetSpravatoTracking({ SpravatoTrackingArray: setSpravatoTrackingArray })
    }
  }, [month, year, all, day, week])
  // 1. loop thrpough spravato tracking array
  // 2. get the date
  //3. get the number of spravatos for the day
  //4. push the date and number of spravatos to a new array
  new Date()
  //number of days in current month
  const daysInMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  ).getDate()
  const daysInMonthArray = []
  for (let i = 0; i < daysInMonth; i++) {
    daysInMonthArray.push(i + 1)
  }
  const monthsInYear = []
  for (let i = 0; i < 12; i++) {
    monthsInYear.push(i + 1)
  }
  // get the number of years we have data for
  const yearsTotal: any = []
  for (let i = 0; i < spravatoTrackingArray.length; i++) {
    if (
      !yearsTotal.includes(
        spravatoTrackingArray[i].dateAdministered
          .toDate()
          .toDateString()
          .split(' ')[3]
      )
    ) {
      yearsTotal.push(
        spravatoTrackingArray[i].dateAdministered
          .toDate()
          .toDateString()
          .split(' ')[3]
      )
    }
  }

  var data = null

  if (day) {
    totalDayNumber = 0
    data = daysInMonthArray.map((day: any) => {
      var dayNumber = 0
      //1.get the number of spravatos for every day in the month and display it on the graph
      spravatoTrackingArray.map((spravatoTracking) => {
        if (
          spravatoTracking.dateAdministered.toDate().getDate() == day &&
          spravatoTracking.dateAdministered.toDate().getMonth() + 1 ==
            selectedDate.getMonth() + 1
        ) {
          dayNumber = dayNumber + 1
          totalDayNumber = totalDayNumber + 1
        }
      })

      return {
        date: day,
        numberOfSpravato: dayNumber,
      }
    })
  }
  if (month) {
    totalDayNumber = 0
    data = monthsInYear.map((month: any) => {
      var monthNumber = 0
      //1.get the number of spravatos for every day in the month and display it on the graph
      spravatoTrackingArray.map((spravatoTracking) => {
        if (
          spravatoTracking.dateAdministered.toDate().getMonth() + 1 == month &&
          spravatoTracking.dateAdministered.toDate().getFullYear() ==
            selectedDate.getFullYear()
        ) {
          monthNumber = monthNumber + 1
          totalDayNumber = totalDayNumber + 1
        }
      })

      return {
        date: month,
        numberOfSpravato: monthNumber,
      }
    })
  }
  if (all) {
    totalDayNumber = 0
    data = yearsTotal.map((year: any) => {
      var monthNumber = 0
      //1.get the number of spravatos for every day in the month and display it on the graph
      spravatoTrackingArray.map((spravatoTracking) => {
        if (spravatoTracking.dateAdministered.toDate().getFullYear() == year) {
          monthNumber = monthNumber + 1
          totalDayNumber = totalDayNumber + 1
        }
      })

      return {
        date: year,
        numberOfSpravato: monthNumber,
      }
    })
  }
  //1.get all the ma's that have administered spravato
  //2. get the number of spravatos administered by each ma
  //2. add how many spravatos they have administered
  //3. get the percentage of spravatos they have administered

  const maSpravatoArray: any = []
  spravatoTrackingArray.map((spravatoTracking) => {
    if (!maSpravatoArray.includes(spravatoTracking.MA.trim())) {
      maSpravatoArray.push({
        ma: spravatoTracking.MA.trim(),
        numberOfSpravatos: 1,
      })
    } else {
      maSpravatoArray.map((maSpravato: any) => {
        if (maSpravato.ma == spravatoTracking.MA.trim()) {
          maSpravato.numberOfSpravatos = maSpravato.numberOfSpravatos + 1
        }
      })
    }
  })
  const dataForMA = maSpravatoArray.map((maSpravato: any) => {
    return {
      ma: maSpravato.ma,
      numberOfSpravatos: maSpravato.numberOfSpravatos,
    }
  })
  console.log(dataForMA)
  //   const maSpravatoPercentageArray = []
  //   maSpravatoArray.map((ma: any) => {
  //     var maSpravatoNumber = 0
  //     spravatoTrackingArray.map((spravatoTracking) => {
  //       if (spravatoTracking.MA == ma) {
  //         maSpravatoNumber = maSpravatoNumber + 1
  //       }
  //     })
  //     return {
  //       maName: ma,
  //       maSpravatoPercentage: (maSpravatoNumber / totalDayNumber) * 100,
  //     }
  //   })

  return (
    <div>
      <Header />
      <div className="flex flex-col">
        <div className="flex h-[80vh] flex-col">
          <div className="flex flex-row p-10 ">
            <div className=" mr-5 flex w-[20%] flex-col">
              <MenuItem
                icon={
                  <UserIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                }
                text="Number of Spravatos "
                onClick={() => {
                  setNumberOfSpravatos(true)
                }}
              />
              <MenuItem
                icon={
                  <UserIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                }
                text="MA's Spravato Percentage"
                onClick={() => {
                  setmaSpravatoPercentage(true), setNumberOfSpravatos(false)
                }}
              />
              {/* <MenuItem
                icon={
                  <UserIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                }
                text="MostS"
                onClick={() => {}}
              /> */}
              <div className=" mt-[200px]">
                <Datepicker
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              </div>
            </div>
            <div className="flex w-[75%] flex-col items-center justify-center">
              {numberOfSpravatos && (
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
                />
              )}
              {maSpravatoPercentage && (
                <PieGraph
                  data={dataForMA}
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
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SpravtoAnalytics
