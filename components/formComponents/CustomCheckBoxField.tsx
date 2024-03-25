import { AnyNaptrRecord } from 'dns'
import React, { useState, useEffect } from 'react'
import MainButton from '../Buttons/MainButton'
import TextInput from '../userInput/TextInput'
import CustomCheckBox from './CustomCheckBox'
import classnames from 'classnames'
const CustomCheckBoxField: React.FC<{
  id?: string
  checkBoxTitles: Array<string>
  title?: string
  marginLeft?: string

  setCheckBoxValues: Function
  checkBoxValues?: any
  allowMultipleCheckBoxes: boolean
  refresh?: boolean
  setRefresh?: Function
  missing?: boolean
  required?: boolean
}> = ({
  id,
  checkBoxTitles,
  title,
  marginLeft,
  setCheckBoxValues,
  checkBoxValues,
  allowMultipleCheckBoxes,
  required,
  missing,
}) => {
  var arrayofStates: any = []
  const arrayofStatesFunctions: any = []
  const [otherValue, setOtherValue] = useState('')
  const [refresh, setRefresh] = useState(false)
  var values: any = [...checkBoxValues]
  var values: any = checkBoxValues
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

  useEffect(() => {
    //get the index of the  checkboxValues
    if (!allowMultipleCheckBoxes) {
      var index = checkBoxTitles.indexOf(checkBoxValues)
      //set the state of the index to true
      arrayofStatesFunctions.forEach((item: any, index1: any) => {
        if (index1 == index) {
          item(true)
        }
      })
    }
  }, [checkBoxValues])
  useEffect(() => {
    // Check the checkboxes that have values in checkBoxValues
    arrayofStates = checkBoxTitles.map((title) =>
      checkBoxValues.includes(title),
    )

    //check the boxes that have values in checkBoxValues
    arrayofStatesFunctions.forEach((item: any, index: any) => {
      item(arrayofStates[index])
    })

    // Tell React to re-render the component
    setRefresh(!refresh)
  }, [checkBoxTitles])

  useEffect(() => {
    //if the index of arrayofStates is true then push the value of the checkBoxTitles to the setCheckBoxValues

    arrayofStates.map((item: any, index: any) => {
      if (allowMultipleCheckBoxes == true) {
        if (item) {
          //if the index of arrayofStates is true then push the value of the checkBoxTitles to the setCheckBoxValues
          //if item already exists in the array then dont push it
          if (!checkBoxValues.includes(checkBoxTitles[index])) {
            // checkBoxValues.push(checkBoxTitles[index])
            setCheckBoxValues((prev: any) => [...prev, checkBoxTitles[index]])
          }
        }

        if (item == false) {
          //if the index of arrayofStates is false then remove the value of the checkBoxTitles to the setCheckBoxValues
          //if item already exists in the array then dont push it
          if (checkBoxValues.includes(checkBoxTitles[index])) {
            // checkBoxValues.push(checkBoxTitles[index])
            setCheckBoxValues((prev: any) =>
              prev.filter((item: any) => item !== checkBoxTitles[index]),
            )
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
  }, [arrayofStates])
  //if number of columns is not defined then render the checkBoxes in one row
  if (required) {
    if (checkBoxValues.length == 0) {
      missing = true
    } else {
      missing = false
    }
  }
  return (
    <div
      id={id}
      className={`${missing ? 'bg-[#ff1818]' : 'bg-[#c3969600]'} ${
        missing ? 'w-[50%]' : undefined
      }
      ${missing ? 'rounded-[20px]' : undefined}
       my-10 flex items-start justify-start ${marginLeft}`}
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
export default CustomCheckBoxField
