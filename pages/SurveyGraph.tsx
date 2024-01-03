import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import Header from '../components/navigation/Header'
import { useRouter } from 'next/router'
import { auth } from '../firebase/firebase'
import { GetSurveys } from '../firebase/firebase'
import PieGraph2 from '../components/GraphComponents/PieGraph2'
import MainButton from '../components/Buttons/MainButton'

const SurveyGraph: NextPage<{}> = () => {
  const router = useRouter()
  const [name, setName] = useState<Array<{ name: string }>>([])
  const [focusArea, setFocusArea] = useState<Array<Array<string>>>([])
  const [interest, setInterest] = useState<Array<{ name: string }>>([])
  const [refresh, setRefresh] = useState(false)
  const [data, setData] = useState<Array<Survey>>([])

  const [hasRun, setHasRun] = useState(false)
  const [hasRunName, setHasRunName] = useState(false)
  const [hasRunFocusArea, setHasRunFocusArea] = useState(false)
  const [hasRunInterest, setHasRunInterest] = useState(false)
  const [nameCount, setNameCount] = useState<
    Array<{ name: string; value: number }>
  >([])
  const [focusAreaCount, setFocusAreaCount] = useState<
    Array<{ name: string; value: number }>
  >([])
  const [interestCount, setInterestCount] = useState<
    Array<{ name: string; value: number }>
  >([])

  useEffect(() => {
    GetSurveys({ setSurveys: setData })
  }, [])

  interface Survey {
    name: string
    interest: string
    focusArea: Array<string>
  }

  // This useEffect is to make sure that the user is logged in before they can access this page.
  useEffect(() => {
    if (!auth.currentUser?.email) {
      router.push('/PatientLogin')
    }
  }, [])

  // This Graph is for Age
  /* This useEffect is for the Age Graph. The first IF statement is to make sure the code only renders once and then
    grabs the index of count. The second IF statement will look at the index and value of that index and increment the value
    by 1 if that index name already exists. And if it doesnt exist already then the value will set to 0 and be ready for
    the next possible increment. */
  useEffect(() => {
    if (!hasRun) {
      name.forEach((item) => {
        const index = nameCount.findIndex((item1) => item1.name == item.name)

        if (index != -1) {
          nameCount[index].value++
          setNameCount([...nameCount])
        } else {
          setNameCount((prev) => [...prev, { name: item.name, value: 0 }])
        }
      })
    }
  }, [name, refresh])

  /* Here is the explanation for the code below:
  1. I have a useEffect hook that takes in a dependency of focusArea and refresh
  2. The useEffect hook checks if the variable hasRunFocusArea is true and if it is, it does nothing.
  3. If it is false, it goes to the forEach loop and checks if the name of the item in the focusArea array is in the focusAreaCount array.
  4. If it is, it increments the value of the item in focusAreaCount array by 1.
  5. If it isn't, it adds the item to the focusAreaCount array with a value of 0 */
  useEffect(() => {
    if (!hasRunFocusArea) {
      focusArea.forEach((item: Array<string>) => {
        item.forEach((item1: string) => {
          const index = focusAreaCount.findIndex(
            (focusAreaItem) => focusAreaItem.name == item1
          )

          if (index != -1) {
            focusAreaCount[index].value++
            setFocusAreaCount([...focusAreaCount])
          } else {
            setFocusAreaCount((prev) => [...prev, { name: item1, value: 0 }])
          }
        })
      })
    }
  }, [focusArea, refresh])
  
  // This is for the Interest Graph
  /* Here is the explanation for the code below:
  1. I set a state called "hasRunInterest" that will run the useEffect only once, so it won't run the loop again and again
  2. Then I loop through the interest array and check if the name of the interest already exists in the interestCount array
  3. if it exists, then I increment the value of the interest by 1
  4. else I create a new object and add it to the interestCount array */
  useEffect(() => {
    if (!hasRunInterest) {
      interest.forEach((item) => {
        const index = interestCount.findIndex(
          (interestItem) => interestItem.name == item.name
        )

        if (index != -1) {
          interestCount[index].value++
          setInterestCount([...interestCount])
        } else {
          setInterestCount((prev) => [...prev, { name: item.name, value: 0 }])
        }
      })
    }
  }, [interest, refresh])

  // This useEffect is mapping through all the surveys data and setting the state for each graph
  useEffect(() => {
    setName([])
    data.map((item: Survey) => {
      setName((prev) => [...prev, { name: item.name }])
      setFocusArea((prev) => [...prev, item.focusArea])
      setInterest((prev) => [...prev, { name: item.interest }])
    })
  }, [data])

  // This is for the Age Graph
  // In this useEffect I created comment blocks to separate the code for each graph
  /* Here is the explanation for the code below:
  1. I have a count array that has objects in it that have an age and a value.
  2. I am using the ageTotal to check if the total of all the ages is greater than 0, if it is then I set hasRun to true.
  3. If the age is undefined then I remove it from the count array
  4. I then remove the last item in the count array because it is always undefined */
  useEffect(() => {
    var ageTotal = 0
    const length = nameCount.length
    if (length > 0) {
      nameCount.splice(length - 1, 1)
    }
    nameCount.forEach((item) => {
      ageTotal += item.value
      if (item.name == undefined) {
        const index = nameCount.findIndex((item) => item.name == undefined)
        nameCount.splice(index, 1)
      }
      if (ageTotal > 0) {
        setHasRun(true)
      }
    })

    /////////////////////////////////////////////////////////////////////////////////////////
    // This is for the focusArea Graph
    /* Here is the explanation for the code below:
    1. I create a variable called focusAreaTotal and set it to 0. This variable is going to be used to determine whether or not the focus area chart has any values.
    2. I use a forEach method to loop through the focusAreaCount array and add the value of each item to the focusAreaTotal variable.
    3. I use an if statement to check if the focusAreaTotal variable is greater than 0. If it is, I set the hasRunFocusArea state to true. This is so that the chart will render if the value is greater than 0. If the value is 0, the chart will not render.
    4. I use an if statement to check if the name of the item is undefined. If it is, I get the index of the item and use the splice method to remove it from the array. This is so that the user doesn't see a value for undefined in the chart. */
    var focusAreaTotal = 0
    focusAreaCount.forEach((item) => {
      focusAreaTotal += item.value
      if (focusAreaTotal > 0) {
        setHasRunFocusArea(true)
      }
      if (item.name == undefined) {
        const index = focusAreaCount.findIndex((item) => item.name == undefined)
        focusAreaCount.splice(index, 1)
      }
    })

    //////////////////////////////////////////////////////////////////////////////////////////
    // This is for the interest Graph
    /* Here is the explanation for the code below:
    1. interestTotal = 0
    2. interestCount.forEach((item) => {console.log('ll', item)interestTotal += item.valueif (interestTotal > 0) {setHasRunInterest(true)}if (item.name == undefined) {const index = interestCount.findIndex((item) => item.name == undefined)interestCount.splice(index, 1)}})
    3. interestTotal += item.value
    4. if (interestTotal > 0) {setHasRunInterest(true)}
    5. if (item.name == undefined) {const index = interestCount.findIndex((item) => item.name == undefined)interestCount.splice(index, 1)}
    6. const index = interestCount.findIndex((item) => item.name == undefined)
    7. interestCount.splice(index, 1) */
    var interestTotal = 0
    interestCount.forEach((item) => {
      interestTotal += item.value
      if (interestTotal > 0) {
        setHasRunInterest(true)
      }
      if (item.name == undefined) {
        const index = interestCount.findIndex((item) => item.name == undefined)
        interestCount.splice(index, 1)
      }
    })
  }, [
    nameCount,
    focusAreaCount,
    interestCount,
    data,
    refresh,
  ])

  return (
    <div>
      <Header selectCompany={'AMA'} routePatientsHome={true} />
      <main className="justify-content flex h-full w-full flex-col items-center">
        {/* This is the "Show Survey button" */}
        {!hasRun && (
          <MainButton
            buttonText="Show Surveys"
            onClick={() => setRefresh(!refresh)}
          />
        )}

        {/* Age pie chart */}
        <div className="flex flex-row">
          <div className="m-10">
            <p className="justify-content items-left flex flex-col text-center font-bold">
              Interest
            </p>
            <PieGraph2
              data={interestCount.filter((item) => item.value != 0)}
              value={'value'}
              nameKey="name"
            />
          </div>
          {/* Focus Area pie chart */}
          <div className="m-10">
            <p className="justify-content items-left flex flex-col text-center font-bold">
              Focus Area
            </p>
            <PieGraph2
              data={focusAreaCount.filter((item) => item.value != 0)}
              value={'value'}
              nameKey="name"
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default SurveyGraph
