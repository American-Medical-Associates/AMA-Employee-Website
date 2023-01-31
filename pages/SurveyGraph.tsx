import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import Header from '../components/Header'
import { useRouter } from 'next/router'
import { auth } from '../firebase'
import { GetSurveys } from '../firebase'
import PieGraph2 from '../components/GraphComponents/PieGraph2'
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import MainButton from '../components/MainButton'
import { id } from 'date-fns/locale'

const SurveyGraph: NextPage<{}> = () => {
  const router = useRouter()
  const [age, setAge] = useState([{}])
  const [gender, setGender] = useState([{}])
  const [currentClient, setCurrentClient] = useState('')
  const [medication, setMedication] = useState('')
  const [OneonOne, setOneonOne] = useState('')
  const [interest, setInterest] = useState('')
  const [insuranceCoverage, setInsuranceCoverage] = useState('')
  const [focusArea, setFocusArea] = useState([])
  const [joinTherapy, setJoinTherapy] = useState([])
  const [time, setTime] = useState([])
  const [sessionLength, setSessionLength] = useState([])
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [count, setCount] = useState<Array<{ name: string; value: number }>>([])
  const [hasRun, setHasRun] = useState(0)
  const [hasRunGender, setHasRunGender] = useState(false)
  const [genderCount, setGenderCount] = useState<
    Array<{ name: string; value: number }>
  >([])

  useEffect(() => {
    GetSurveys({ setSurveys: setData })
  }, [])

  // useEffect(() => {
  //   if (!auth.currentUser?.email) {
  //     router.push('/Login')
  //   }
  // }, [])

  // This Graph is for Age
  useEffect(() => {
    if (hasRun <= 1) {
      age.forEach((num: any) => {
        const index = count.findIndex((item) => item.age == num.name)

        if (index != -1) {
          count[index].value++
          setCount([...count])
        } else {
          setCount((prev) => [...prev, { age: num.name, value: 0 }])
        }
      })
    }
    return () => {
      setHasRun(hasRun + 1)
    }
  }, [age, gender, refresh])

  useEffect(() => {
    if (!hasRunGender) {
      gender.forEach((item: any) => {
        const index = genderCount.findIndex(
          (genderItem) => genderItem.name == item.name
        )

        if (index != -1) {
          genderCount[index].value++
          setGenderCount([...genderCount])
        } else {
          setGenderCount((prev) => [...prev, { name: item.name, value: 0 }])
        }
      })
    }
  }, [gender, refresh])

  useEffect(() => {
    setAge([])
    data.map((item: any) => {
      //turn item.age to number and push to age array
      setAge((prev) => [...prev, { name: item.age }])
      setGender((prev) => [...prev, { name: item.gender }])
    })
  }, [data])

  useEffect(() => {
    var ageTotal = 0
    const length = count.length
    if (length > 0) {
      count.splice(length - 1, 1)
    }

    count.forEach((item) => {
      if (item.age == undefined) {
        const index = count.findIndex((item) => item.age == undefined)
        count.splice(index, 1)
      }

      // If item.name is duplicate, and value is 0 then remove it
      ageTotal += item.value
      if (ageTotal > 0) {
        if (item.value == 0) {
          const index = count.findIndex((item) => item.value == 0)
          count.splice(index, 1)
        }
      }
    })

    var genderTotal = 0

    genderCount.forEach((item) => {
      genderTotal += item.value
      if (genderTotal > 0) {
        setHasRunGender(true)
      }

      if (item.name == undefined) {
        const index = genderCount.findIndex((item) => item.name == undefined)
        genderCount.splice(index, 1)
      }
    })
  }, [genderCount, count, data, refresh])

  return (
    <div>
      <Header selectCompany={'AMA'} />
      <main className="justify-content flex h-full w-full flex-col items-center">
        <MainButton
          buttonText="Show Surveys"
          onClick={() => setRefresh(!refresh)}
        />
        {/* Age pie chart */}
        <div>
          <p className="justify-content items-left flex flex-col text-center font-bold">
            Age
          </p>
          <PieGraph2 data={count} value={'value'} nameKey="age" />
        </div>
        {/* Gender pie chart */}
        <div>
          <p className="justify-content items-left flex flex-col text-center font-bold">
            Gender
          </p>
          <PieGraph2 data={genderCount} value={'value'} nameKey="name" />
        </div>
      </main>
    </div>
  )
}

export default SurveyGraph
