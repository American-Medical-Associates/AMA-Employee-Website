import { AnyNaptrRecord } from 'dns'
import React, { useState, useEffect } from 'react'
import MainButton from '../MainButton'
import TextInput from '../TextInput'
import CustomCheckBox from './CustomCheckBox'

const CustomCheckBoxFeild: React.FC<{
  id?: string
  checkBoxTitles: Array<string>
  title?: string
  marginLeft?: string
  howManyCheckBoxes?: number
  setCheckBoxValues: Function
  checkBoxValues?: any
  allowMultipleCheckBoxes: boolean
  refresh?: boolean
  setRefresh?: Function
}> = ({
  id,
  checkBoxTitles,
  title,
  marginLeft,
  setCheckBoxValues,
  howManyCheckBoxes,
  checkBoxValues,
  allowMultipleCheckBoxes,
}) => {
  const arrayofStates: any = []
  const arrayofStatesFunctions: any = []
  const [otherValue, setOtherValue] = useState('')
  const [refresh, setRefresh] = useState(false)

  //map variable for each howManyCheckBoxes

  checkBoxTitles.map((item, index) => {
    const [state, setState] = useState(false)
    //push the state and setState to the array
    arrayofStates.push(state)
    arrayofStatesFunctions.push(setState)
  })

  //map the array and render the CustomCheckBox
  const checkBoxes = checkBoxTitles.map((item, index) => {
    return (
      <CustomCheckBox
        isChecked={arrayofStates[index]}
        checkedState={arrayofStatesFunctions[index]}
        text={item}
      />
    )
  })

  //   const howManyCheckBoxesArray = Array.from(Array(howManyCheckBoxes).keys())
  //   howManyCheckBoxesArray.map((item, index) => {
  //     const [state, setState] = useState(false)
  //     //push the state and setState to the array
  //     arrayofStates.push(state)
  //     arrayofStatesFunctions.push(setState)
  //   })

  //   //map the array and render the CustomCheckBox
  //   checkBoxes = howManyCheckBoxesArray.map((item, index) => {
  //     return (
  //       <CustomCheckBox
  //         isChecked={arrayofStates[index]}
  //         checkedState={arrayofStatesFunctions[index]}
  //         text={checkBoxTitles[index]}
  //       />
  //     )
  //   })
  // }

  useEffect(() => {
    //if the index of arrayofStates is true then push the value of the checkBoxTitles to the setCheckBoxValues
    // if (allowMultipleCheckBoxes) {

    arrayofStates.map((item: any, index: any) => {
      if (allowMultipleCheckBoxes) {
        if (item) {
          //if the index of arrayofStates is true then push the value of the checkBoxTitles to the setCheckBoxValues
          //if item already exists in the array then dont push it
          if (!checkBoxValues.includes(checkBoxTitles[index])) {
            checkBoxValues.push(checkBoxTitles[index])
          }
          // if (checkBoxTitles[index] === 'Other') {
          //   checkBoxValues.push(otherValue)
          // }
        }
        if (item == false) {
          if (!arrayofStates.includes(true)) {
            checkBoxValues.pop()
          } else {
            checkBoxValues.splice(index, 1)
          }
        }
      } else {
        var numberOfTrueValues = 0
        //set all the values to false except the one that is true
        arrayofStates.map((item1: any, index1: any) => {
          if (item1 == true) {
            numberOfTrueValues += 1

            setCheckBoxValues(checkBoxTitles[index1])
          }
          if (numberOfTrueValues > 1) {
            arrayofStatesFunctions.forEach((item2: any, index2: any) => {
              item2(false)
            })
            setRefresh(!refresh)
          }
        })
      }
    })
    console.log(checkBoxValues)

    // if (howManyCheckBoxes < checkBoxTitles.length) {

    //     howManyCheckBoxes =checkBoxTitles.length

    //   }
  }, [arrayofStates])
  //if number of columns is not defined then render the checkBoxes in one row

  return (
    <div
      id={id}
      className={`my-10 flex items-start justify-start ${marginLeft}`}
    >
      <div className=" flex flex-col ">
        <h3 className="my-5 ml-5 text-[#616161]  sm:text-lg md:text-2xl">
          {title}
        </h3>
        {checkBoxes}
        {/* {checkBoxValues} */}
        {checkBoxValues == 'Other' && (
          <div className=" flex w-full flex-row justify-between">
            <div className=" mr-3">
              <TextInput
                placeHolder="Other"
                value={otherValue}
                onChange={(e: any) => {
                  setOtherValue(e.target.value)
                }}
              />
            </div>
            <MainButton
              buttonText="Add"
              buttonWidth="w-full"
              onClick={() => {
                checkBoxTitles.push(otherValue)
                setCheckBoxValues(otherValue)
                // setOtherValue('')
                setRefresh(!refresh)
                //set all check boxes to false
                arrayofStatesFunctions.forEach((item: any, index: any) => {
                  item(false)
                })
              }}
            />
          </div>
        )}
        {otherValue == checkBoxValues && checkBoxTitles.includes('Other') && (
          <div className=" flex w-full flex-col">
            <p className=" text-2xl">
              Other answer:
              <span className=" text-[#3f6efa]"> {checkBoxValues}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
export default CustomCheckBoxFeild
