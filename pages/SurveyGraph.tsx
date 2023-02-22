import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import Header from '../components/Header'
import { useRouter } from 'next/router'
import { auth } from '../firebase'
import { GetSurveys } from '../firebase'
import PieGraph2 from '../components/GraphComponents/PieGraph2'
import MainButton from '../components/MainButton'

const SurveyGraph: NextPage<{}> = () => {
  const router = useRouter()
  const [age, setAge] = useState<Array<{ name: string }>>([])
  const [gender, setGender] = useState<Array<{ name: string }>>([])
  const [focusArea, setFocusArea] = useState<Array<Array<string>>>([])
  const [currentClient, setCurrentClient] = useState<Array<{ name: string }>>(
    []
  )
  const [medication, setMedication] = useState<Array<{ name: string }>>([])
  const [OneOnOne, setOneOnOne] = useState<Array<{ name: string }>>([])
  const [interest, setInterest] = useState<Array<{ name: string }>>([])

  const [daysOfWeek, setDaysOfWeek] = useState<Array<Array<string>>>([])
  const [timeOfDay, setTimeOfDay] = useState<Array<Array<string>>>([])
  const [sessionLength, setSessionLength] = useState<Array<Array<string>>>([])
  const [data, setData] = useState<Array<Survey>>([])
  const [insuranceCoverage, setInsuranceCoverage] = useState<
    Array<{ name: string }>
  >([])
  const [refresh, setRefresh] = useState(false)

  const [hasRun, setHasRun] = useState(false)
  const [hasRunGender, setHasRunGender] = useState(false)
  const [hasRunFocusArea, setHasRunFocusArea] = useState(false)
  const [hasRunClient, setHasRunClient] = useState(false)
  const [hasRunMedication, setHasRunMedication] = useState(false)
  const [hasRunOneOnOne, setHasRunOneOnOne] = useState(false)
  const [hasRunInterest, setHasRunInterest] = useState(false)
  const [hasRunDaysOfWeek, setHasRunDaysOfWeek] = useState(false)
  const [hasRunTimeOfDay, setHasRunTimeOfDay] = useState(false)
  const [hasRunSessionLength, setHasRunSessionLength] = useState(false)
  const [hasRunInsuranceCoverage, setHasRunInsuranceCoverage] = useState(false)
  const [ageCount, setAgeCount] = useState<
    Array<{ name: string; value: number }>
  >([])
  const [genderCount, setGenderCount] = useState<
    Array<{ name: string; value: number }>
  >([])
  const [focusAreaCount, setFocusAreaCount] = useState<
    Array<{ name: string; value: number }>
  >([])
  const [clientCount, setClientCount] = useState<
    Array<{ name: string; value: number }>
  >([])
  const [medicationCount, setMedicationCount] = useState<
    Array<{ name: string; value: number }>
  >([])
  const [OneOnOneCount, setOneOnOneCount] = useState<
    Array<{ name: string; value: number }>
  >([])
  const [interestCount, setInterestCount] = useState<
    Array<{ name: string; value: number }>
  >([])
  const [daysOfWeekCount, setDaysOfWeekCount] = useState<
    Array<{ name: string; value: number }>
  >([])
  const [timeOfDayCount, setTimeOfDayCount] = useState<
    Array<{ name: string; value: number }>
  >([])
  const [sessionLengthCount, setSessionLengthCount] = useState<
    Array<{ name: string; value: number }>
  >([])
  const [insuranceCoverageCount, setInsuranceCoverageCount] = useState<
    Array<{ name: string; value: number }>
  >([])

  useEffect(() => {
    GetSurveys({ setSurveys: setData })
  }, [])

  interface Survey {
    age: string
    gender: string
    currentClient: string
    medication: string
    OneonOne: string
    interest: string
    focusArea: Array<string>
    daysOfWeek: Array<string>
    timeOfDay: Array<string>
    sessionLength: Array<string>
    insuranceCoverage: string
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
      age.forEach((item) => {
        const index = ageCount.findIndex((item1) => item1.name == item.name)

        if (index != -1) {
          ageCount[index].value++
          setAgeCount([...ageCount])
        } else {
          setAgeCount((prev) => [...prev, { name: item.name, value: 0 }])
        }
      })
    }
  }, [age, refresh])

  /* This useEffect is for the Gender Graph. The first IF statement is to make sure that the code only renders once and then 
  grabs the genderCount index. The second IF statement will look at the index and value of that index and increment the value
  by 1 if that index name already exists. And if it doesnt exist already then the value will set to 0 and be ready for
  the next possible increment. */
  useEffect(() => {
    gender.forEach((item) => {
      const index = genderCount.findIndex(
        (genderItem) => genderItem.name == item.name
      )

      if (!hasRunGender) {
        if (index != -1) {
          genderCount[index].value++
          setGenderCount([...genderCount])
        } else {
          setGenderCount((prev) => [...prev, { name: item.name, value: 0 }])
        }
      }
    })
  }, [gender, refresh])

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

  /* Here is the explanation for the code below:
  1. useEffect is used to run the code only once when the component is mounted.
  2. currentClient is an array of objects, so we need to loop through them.
  3. We are checking if the currentClient.name is already present in clientCount array.
  4. If it is present, we are incrementing the value.
  5. If it is not present, we are adding the object to the array. */
  useEffect(() => {
    if (!hasRunClient) {
      currentClient.forEach((item) => {
        const index = clientCount.findIndex(
          (clientItem) => clientItem.name == item.name
        )

        if (index != -1) {
          clientCount[index].value++
          setClientCount([...clientCount])
        } else {
          setClientCount((prev) => [...prev, { name: item.name, value: 0 }])
        }
      })
    }
  }, [currentClient, refresh])

  /* Here is the explanation for the code below:
  1. useEffect runs only once (hasRunMedication is false)
  2. medicationCount is an array of objects that contains the name of the medication and the number of times it appears in the medication array.
  3. medicationCount is initialized as an empty array []
  4. medication is an array of objects that contains the name of the medication and some other details.
  5. medicationCount.findIndex() returns the index of the first element in the array that satisfies the provided testing function.
  6. medicationCount[index].value++ increments the value of the medicationCount array by 1.
  7. setMedicationCount([...medicationCount]) updates the state of medicationCount.
  8. If the medication name is not found in medicationCount, a new object is created and added to medicationCount.
  9. setMedicationCount((prev) => [...prev, { name: item.name, value: 0 }]) updates the state of medicationCount.
  10. refresh is a state variable that is set to true initially and then set to false every time useEffect runs.
  11. useEffect runs again but hasRunMedication is true and so the condition is not met and the useEffect function does not run. */
  useEffect(() => {
    if (!hasRunMedication) {
      medication.forEach((item) => {
        const index = medicationCount.findIndex(
          (medicationItem) => medicationItem.name == item.name
        )

        if (index != -1) {
          medicationCount[index].value++
          setMedicationCount([...medicationCount])
        } else {
          setMedicationCount((prev) => [...prev, { name: item.name, value: 0 }])
        }
      })
    }
  }, [medication, refresh])

  // This is for the OneOnOne Graph
  /* Here is the explanation for the code below:
  1. We are running the useEffect only once by checking the hasRunOneOnOne boolean value. 
  2. We are iterating through the OneOnOne array and checking if the name of the item is present in OneOnOneCount array. If it is not present, we are adding that item to OneOnOneCount array. If it is present, we are just increasing the value of that item.
  3. We are using the setOneOnOneCount function to update the OneOnOneCount array. We are using the spread operator to make sure that the array is updated and not replaced. 
  4. We are also updating the hasRunOneOnOne boolean value to true so that the useEffect does not run again. */
  useEffect(() => {
    if (!hasRunOneOnOne) {
      OneOnOne.forEach((item) => {
        const index = OneOnOneCount.findIndex(
          (OneOnOneItem) => OneOnOneItem.name == item.name
        )

        if (index != -1) {
          OneOnOneCount[index].value++
          setOneOnOneCount([...OneOnOneCount])
        } else {
          setOneOnOneCount((prev) => [...prev, { name: item.name, value: 0 }])
        }
      })
    }
  }, [OneOnOne, refresh])

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

  // This is for the DaysOfWeek Graph
  /* Here is the explanation for the code below:
  1. HasRunDaysOfWeek is a boolean that is set to false and it will be set to true after the first time the code runs
  2. We go through the array of daysOfWeek and if the item is not in the daysOfWeekCount array, we add it and set the value to 0, otherwise we increment the value by 1
  3. After the first time the code runs, we set hasRunDaysOfWeek to true
  4. When the daysOfWeekCount array changes, we update the graph */
  useEffect(() => {
    if (!hasRunDaysOfWeek) {
      daysOfWeek.forEach((item: Array<string>) => {
        item.forEach((item1: string) => {
          const index = daysOfWeekCount.findIndex(
            (daysOfWeekItem) => daysOfWeekItem.name == item1
          )

          if (index != -1) {
            daysOfWeekCount[index].value++
            setDaysOfWeekCount([...daysOfWeekCount])
          } else {
            setDaysOfWeekCount((prev) => [...prev, { name: item1, value: 0 }])
          }
        })
      })
    }
  }, [daysOfWeek, refresh])

  // This is for the TimeOfDay Graph
  /* Here is the explanation for the code below:
  1. timeOfDay is a 2D array that contains the days of the week and the time of the day (morning, afternoon, evening or night) that the user has selected.
  2. timeOfDayCount is a 1D array that contains the days of the week and the number of times the user has selected that day of the week.
  3. I want to increment the value of the day of the week in timeOfDayCount if the user has selected that day of the week in timeOfDay.
  4. I want to add the day of the week in timeOfDayCount if the user has selected that day of the week in timeOfDay.
  5. If the user has selected the day of the week more than once, I want to increment the value by 1. */
  useEffect(() => {
    if (!hasRunTimeOfDay) {
      timeOfDay.forEach((item: Array<string>) => {
        item.forEach((item1: string) => {
          const index = timeOfDayCount.findIndex(
            (timeOfDayItem) => timeOfDayItem.name == item1
          )

          if (index != -1) {
            timeOfDayCount[index].value++
            setTimeOfDayCount([...timeOfDayCount])
          } else {
            setTimeOfDayCount((prev) => [...prev, { name: item1, value: 0 }])
          }
        })
      })
    }
  }, [timeOfDay, refresh])

  // This is for the SessionLength Graph
  /* Here is the explanation for the code below:
  1. sessionLength is an array of arrays of strings. Each array inside sessionLength represents a session.
  2. sessionLengthCount is an array of objects. Each object in the array represents a session length.
  3. The code above loops through sessionLength and checks if the session length exists in sessionLengthCount. If it does, it increases the value. If it doesn't, it adds the session length to sessionLengthCount. */
  useEffect(() => {
    if (!hasRunSessionLength) {
      sessionLength.forEach((item: Array<string>) => {
        item.forEach((item1: string) => {
          const index = sessionLengthCount.findIndex(
            (sessionLengthItem) => sessionLengthItem.name == item1
          )

          if (index != -1) {
            sessionLengthCount[index].value++
            setSessionLengthCount([...sessionLengthCount])
          } else {
            setSessionLengthCount((prev) => [
              ...prev,
              { name: item1, value: 0 },
            ])
          }
        })
      })
    }
  }, [sessionLength, refresh])

  // This is for the Insurance Coverage Graph
  /* Here is the explanation for the code below:
  1. We use the useEffect hook to run the code every time the insuranceCoverage value changes.
  2. We check if the hasRunInsuranceCoverage is false. This is important because we only want to run the code once, since the insuranceCoverageCount is only supposed to be set once.
  3. We loop through the insuranceCoverage array and look for the name of the insuranceCoverage item in the insuranceCoverageCount array. If the name is found, we increment the value of the item in the insuranceCoverageCount array.
  4. If the name is not found, we add the name to the insuranceCoverageCount array with a value of 0.
  5. We set the insuranceCoverageCount array to the new array with the updated values. */
  useEffect(() => {
    if (!hasRunInsuranceCoverage) {
      insuranceCoverage.forEach((item) => {
        const index = insuranceCoverageCount.findIndex(
          (insuranceCoverageItem) => insuranceCoverageItem.name == item.name
        )

        if (index != -1) {
          insuranceCoverageCount[index].value++
          setInsuranceCoverageCount([...insuranceCoverageCount])
        } else {
          setInsuranceCoverageCount((prev) => [
            ...prev,
            { name: item.name, value: 0 },
          ])
        }
      })
    }
  }, [insuranceCoverage, refresh])

  // This useEffect is mapping through all the surveys data and setting the state for each graph
  useEffect(() => {
    setAge([])
    data.map((item: Survey) => {
      setAge((prev) => [...prev, { name: item.age }])
      setGender((prev) => [...prev, { name: item.gender }])
      setFocusArea((prev) => [...prev, item.focusArea])
      setCurrentClient((prev) => [...prev, { name: item.currentClient }])
      setMedication((prev) => [...prev, { name: item.medication }])
      setOneOnOne((prev) => [...prev, { name: item.OneonOne }])
      setInterest((prev) => [...prev, { name: item.interest }])
      setDaysOfWeek((prev) => [...prev, item.daysOfWeek])
      setTimeOfDay((prev) => [...prev, item.timeOfDay])
      setSessionLength((prev) => [...prev, item.sessionLength])
      setInsuranceCoverage((prev) => [
        ...prev,
        { name: item.insuranceCoverage },
      ])
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
    const length = ageCount.length
    if (length > 0) {
      ageCount.splice(length - 1, 1)
    }
    ageCount.forEach((item) => {
      ageTotal += item.value
      if (item.name == undefined) {
        const index = ageCount.findIndex((item) => item.name == undefined)
        ageCount.splice(index, 1)
      }
      if (ageTotal > 0) {
        setHasRun(true)
      }
    })
    /////////////////////////////////////////////////////////////////////////////////////////

    // This is for the Gender Graph
    /* Here is the explanation for the code below:
    1. genderTotal is a variable that stores the total number of participants in the survey.
    2. genderCount is an array of objects, where each object has a name and value property. 
    3. The forEach method iterates through the genderCount array and adds the value property of each object to the genderTotal variable.
    4. The conditional statement checks to see if the value of genderTotal is greater than 0. If it is, then set the value of hasRunGender to true.
    5. The conditional statement checks to see if the name property of any of the objects in the array is undefined. If it is, then the splice method removes that object from the array. */
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
    /////////////////////////////////////////////////////////////////////////////////////////

    // This is for the currentClient Graph
    /* Here is the explanation for the code below:
    1. We create a variable called currentClientTotal and set it to 0
    2. We loop through the clientCount array and add each item's value to currentClientTotal
    3. If currentClientTotal is greater than 0, we set hasRunClient to true
    4. If the item's name is undefined, we find the index of that item and remove it from the array */
    var currentClientTotal = 0
    clientCount.forEach((item) => {
      currentClientTotal += item.value
      if (currentClientTotal > 0) {
        setHasRunClient(true)
      }
      if (item.name == undefined) {
        const index = clientCount.findIndex((item) => item.name == undefined)
        clientCount.splice(index, 1)
      }
    })
    /////////////////////////////////////////////////////////////////////////////////////////

    // This is for the medication Graph
    /* Here is the explanation for the code below:
    1. Create a variable called medicationTotal that is equal to 0.
    2. Loop through medicationCount array and for each item, add the value to medicationTotal.
    3. If medicationTotal is greater than 0, set hasRunMedication to true.
    4. If the item name is undefined, find the index of that item and remove it from the array. */
    var medicationTotal = 0
    medicationCount.forEach((item) => {
      medicationTotal += item.value
      if (medicationTotal > 0) {
        setHasRunMedication(true)
      }
      if (item.name == undefined) {
        const index = medicationCount.findIndex(
          (item) => item.name == undefined
        )
        medicationCount.splice(index, 1)
      }
    })
    //////////////////////////////////////////////////////////////////////////////////////////

    // This is for the OneOnOne Graph
    /* Here is the explanation for the code below:
    1. I have a variable called oneonOneTotal which will be used to check if the total of one on ones is greater than 0
    2. I have a state called hasRunOneOnOne which will be used to check if the one on ones have been run
    3. I have a function that will loop through the array and add the values of the array items to the oneonOneTotal variable
    4. If the oneonOneTotal variable is greater than 0, the hasRunOneOnOne state will be set to true
    5. If the name of the array item is undefined, it will be removed from the array */
    var OneOnOneTotal = 0
    OneOnOneCount.forEach((item) => {
      OneOnOneTotal += item.value
      if (OneOnOneTotal > 0) {
        setHasRunOneOnOne(true)
      }
      if (item.name == undefined) {
        const index = OneOnOneCount.findIndex((item) => item.name == undefined)
        OneOnOneCount.splice(index, 1)
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
    //////////////////////////////////////////////////////////////////////////////////////////

    // This is for the daysOfWeek Graph
    /* Here is the explanation for the code below:
    1. The first line (var daysOfWeekTotal = 0) sets the total number of days of the week to zero.
    2. The second line (daysOfWeekCount.forEach((item) => {) iterates through each item in the daysOfWeekCount array.
    3. The third line (daysOfWeekTotal += item.value) adds the value of the current item to the total.
    4. The fourth line (if (daysOfWeekTotal > 0) { setHasRunDaysOfWeek(true) }) sets a flag to true if there are any days of the week selected.
    5. The fifth line (if (item.name == undefined) { const index = daysOfWeekCount.findIndex((item) => item.name == undefined) daysOfWeekCount.splice(index, 1) }) removes any undefined items from the array. */
    var daysOfWeekTotal = 0
    daysOfWeekCount.forEach((item) => {
      daysOfWeekTotal += item.value
      if (daysOfWeekTotal > 0) {
        setHasRunDaysOfWeek(true)
      }
      if (item.name == undefined) {
        const index = daysOfWeekCount.findIndex(
          (item) => item.name == undefined
        )
        daysOfWeekCount.splice(index, 1)
      }
    })
    //////////////////////////////////////////////////////////////////////////////////////////

    // This is for the timeOfDay Graph
    /* Here is the explanation for the code below:
    1. timeOfDayTotal is a variable I use to check if the array has any values in it.
    2. timeOfDayCount.forEach loops through the array.
    3. timeOfDayTotal adds the values of the array.
    4. setHasRunTimeOfDay sets hasRunTimeOfDay to true if timeOfDayTotal is greater than 0.
    5. timeOfDayCount.findIndex finds the index of the object with a name of undefined.
    6. timeOfDayCount.splice removes that object from the array. */
    var timeOfDayTotal = 0
    timeOfDayCount.forEach((item) => {
      timeOfDayTotal += item.value
      if (timeOfDayTotal > 0) {
        setHasRunTimeOfDay(true)
      }
      if (item.name == undefined) {
        const index = timeOfDayCount.findIndex((item) => item.name == undefined)
        timeOfDayCount.splice(index, 1)
      }
    })
    //////////////////////////////////////////////////////////////////////////////////////////

    // This is for the sessionLength Graph
    /* Here is the explanation for the code below:
    1. We declare a variable called sessionLengthTotal and set it to 0. This variable will be used to sum up all the values in the sessionLengthCount array.
    2. We invoke the forEach() method on the sessionLengthCount array. This method will loop through the array and execute a callback function for each item in the array.
    3. Inside the callback function, we add the value of each item to the sessionLengthTotal variable.
    4. We check if the value of sessionLengthTotal is greater than 0. If it is, we set the hasRunSessionLength state to true. This is so we can display a message if there are no results.
    5. We then check if the name property of the item is undefined. If it is, we get the index of the item in the array and remove it. This is because we don’t want to display it in the chart.
    6. We then invoke the setSessionLengthCount() method to update the sessionLengthCount state. */
    var sessionLengthTotal = 0
    sessionLengthCount.forEach((item) => {
      sessionLengthTotal += item.value
      if (sessionLengthTotal > 0) {
        setHasRunSessionLength(true)
      }
      if (item.name == undefined) {
        const index = sessionLengthCount.findIndex(
          (item) => item.name == undefined
        )
        sessionLengthCount.splice(index, 1)
      }
    })
    //////////////////////////////////////////////////////////////////////////////////////////

    // This is for the insuranceCoverage Graph
    /* Here is the explanation for the code below:
    1. The insuranceCoverageCount array is a list of objects that have key/value pairs. The value is a number and the key is a string.
    2. The forEach() method takes in a callback function that will run for each item in the array.
    3. For each item in the array, the value is added to the total.
    4. If the total is greater than 0, the setHasRunInsuranceCoverage() function is called.
    5. If the name of the object is undefined, then the object is removed from the array. */
    var insuranceCoverageTotal = 0
    insuranceCoverageCount.forEach((item) => {
      insuranceCoverageTotal += item.value
      if (insuranceCoverageTotal > 0) {
        setHasRunInsuranceCoverage(true)
      }
      if (item.name == undefined) {
        const index = insuranceCoverageCount.findIndex(
          (item) => item.name == undefined
        )
        insuranceCoverageCount.splice(index, 1)
      }
    })
    //////////////////////////////////////////////////////////////////////////////////////////
  }, [
    genderCount,
    ageCount,
    focusAreaCount,
    clientCount,
    medicationCount,
    OneOnOneCount,
    interestCount,
    daysOfWeekCount,
    timeOfDayCount,
    sessionLengthCount,
    insuranceCoverageCount,
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
              Age
            </p>
            <PieGraph2
              data={ageCount.filter((item) => item.value != 0)}
              value={'value'}
              nameKey="name"
            />
          </div>
          {/* Gender pie chart */}
          <div className="m-10">
            <p className="justify-content items-left flex flex-col text-center font-bold">
              Gender
            </p>
            <PieGraph2
              data={genderCount.filter((item) => item.value != 0)}
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
        <div className="flex flex-row">
          {/* Current Client pie chart */}
          <div className="m-10">
            <p className="justify-content items-left flex flex-col text-center font-bold">
              Current Client
            </p>
            <PieGraph2
              data={clientCount.filter((item) => item.value != 0)}
              value={'value'}
              nameKey="name"
            />
          </div>
          {/* Medication pie chart */}
          <div className="m-10">
            <p className="justify-content items-left flex flex-col text-center font-bold">
              On Medication
            </p>
            <PieGraph2
              data={medicationCount.filter((item) => item.value != 0)}
              value={'value'}
              nameKey="name"
            />
          </div>
          {/* One on One pie chart */}
          <div className="m-10">
            <p className="justify-content items-left flex flex-col text-center font-bold">
              One on One
            </p>
            <PieGraph2
              data={OneOnOneCount.filter((item) => item.value != 0)}
              value={'value'}
              nameKey="name"
            />
          </div>
        </div>
        <div className="flex flex-row">
          {/* Interest Pie chart */}
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
          {/* Days of the week pie chart */}
          <div className="m-10">
            <p className="justify-content items-left flex flex-col text-center font-bold">
              Days of the Week
            </p>
            <PieGraph2
              data={daysOfWeekCount.filter((item) => item.value != 0)}
              value={'value'}
              nameKey="name"
            />
          </div>
          {/* Time of day pie chart */}
          <div className="m-10">
            <p className="justify-content items-left flex flex-col text-center font-bold">
              Time of day
            </p>
            <PieGraph2
              data={timeOfDayCount.filter((item) => item.value != 0)}
              value={'value'}
              nameKey="name"
            />
          </div>
        </div>
        <div className="flex flex-row">
          {/* Session Length pie chart */}
          <div className="m-10">
            <p className="justify-content items-left flex flex-col text-center font-bold">
              Session Length
            </p>
            <PieGraph2
              data={sessionLengthCount.filter((item) => item.value != 0)}
              value={'value'}
              nameKey="name"
            />
          </div>
          {/* Insurance Coverage pie chart */}
          <div className="m-10">
            <p className="justify-content items-left flex flex-col text-center font-bold">
              Insurance Coverage
            </p>
            <PieGraph2
              data={insuranceCoverageCount.filter((item) => item.value != 0)}
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
