import React, { useState, useEffect } from 'react'
import MainButton from '../Buttons/MainButton'
import TextInput from '../userInput/TextInput'

import { XMarkIcon } from '@heroicons/react/24/outline'
import DateInput from '../userInput/DateInput'

const UserCreatedListFromInputBox: React.FC<{
  list: Array<any>
  inputBoxPlaceHolder?: string
  title?: string
  showDateField?: boolean
  dateFieldPlaceHolder?: string
  showAddDrugFields?: boolean
  id?: string
  required?: boolean
  missing?: boolean
}> = ({
  list,
  inputBoxPlaceHolder,
  title,
  showDateField,
  dateFieldPlaceHolder,
  showAddDrugFields,
  id,
  required,
  missing,
}) => {
  const [inputBox, setInputBox] = useState('')
  const [date, setDate] = useState('')
  const [refresh, setRefresh] = useState(false)
  const [drugNameInput, setDrugNameInput] = useState('')
  const [drugDoseInput, setDrugDoseInput] = useState('')
  const [drugFrequencyInput, setDrugFrequencyInput] = useState('')
  const [prescribePhysician, setPrescribePhysician] = useState('')

  const whatTheUserHasAdded = list.map((item) => {
    if (showDateField) {
      //format the date with slashes after 2 digits
      const dateWithSlashes = item.twoItems.date.replace(
        /(\d{2})(\d{2})(\d{4})/,
        '$1/$2/$3'
      )
      if (required) {
        if (list.length === 0) {
          missing = true
        } else {
          missing = false
        }
      }

      return (
        <div
          id={id}
          className={`  ml-[5%] flex items-center justify-center md:flex-col `}
        >
          <div className=" mt-5 flex w-full items-center justify-center rounded-[30px]  bg-[#e9e7e7b1] md:flex-col ">
            <p className="mx-10 my-3 text-2xl text-[#616161]">
              {item.twoItems.input}
            </p>
            <p className="mx-10 my-3 text-2xl text-[#616161]">
              {dateWithSlashes}
            </p>
          </div>
          <div className="mx-3 mt-5 flex items-center justify-center ">
            <XMarkIcon
              onClick={() => {
                //get the index of the item
                const index = list.indexOf(item)
                //remove the item from the list
                list.splice(index, 1)
                //update the list
                setRefresh(!refresh)
              }}
              className=" h-8 w-8 cursor-pointer text-[#ff1d1d]"
            />
          </div>
        </div>
      )
    } else if (showAddDrugFields) {
      return (
        <div className=" ml-[5%]  flex items-center justify-center  ">
          <div className=" mt-5 flex w-full flex-col items-center justify-center  rounded-[30px] bg-[#e9e7e7b1] md:flex-row ">
            <p className="mx-10 my-3 text-[#616161] md:text-2xl">
              {item.drug.DrugName}
            </p>
            <p className="mx-10 my-3 text-[#616161] md:text-2xl">
              {item.drug.DrugDose}
            </p>
            <p className="mx-10 my-3 text-[#616161] md:text-2xl">
              {item.drug.DrugFrequency}
            </p>
            <p className="mx-10 my-3 text-[#616161] md:text-2xl">
              {item.drug.PrescribePhysician}
            </p>
          </div>
          <div className="mx-3 mt-5 flex items-center justify-center ">
            <XMarkIcon
              onClick={() => {
                //get the index of the item
                const index = list.indexOf(item)
                //remove the item from the list
                list.splice(index, 1)
                //update the list
                setRefresh(!refresh)
              }}
              className=" h-8 w-8 cursor-pointer text-[#ff1d1d]"
            />
          </div>
        </div>
      )
    } else {
      return (
        <div className=" ml-[5%] flex items-center justify-center ">
          <div className=" mt-5 flex w-full items-center justify-center  rounded-[30px] bg-[#e9e7e7b1] ">
            <p className="mx-10 my-3 text-2xl text-[#616161]">{item}</p>
          </div>
          <div className="mx-3 mt-5 flex items-center justify-center ">
            <XMarkIcon
              onClick={() => {
                //get the index of the item
                const index = list.indexOf(item)
                //remove the item from the list
                list.splice(index, 1)
                //update the list
                setRefresh(!refresh)
              }}
              className=" h-8 w-8 cursor-pointer text-[#ff1d1d]"
            />
          </div>
        </div>
      )
    }
  })

  return (
    <div
      className={` ${missing ? 'bg-[#ff1818]' : 'bg-[#c3969600]'} ${
        missing ? 'w-[50%]' : undefined
      }
      ${
        missing ? 'rounded-[20px]' : undefined
      } my-20 flex w-full flex-col items-center justify-center text-center`}
    >
      <h3
        className={` text-center text-xl ${
          missing ? 'text-black' : 'text-[red]'
        }  `}
      >
        {title}
      </h3>
      {!showAddDrugFields && (
        <TextInput
          placeHolder={inputBoxPlaceHolder!}
          value={inputBox}
          onChange={(e: any) => setInputBox(e.target.value)}
          widthPercentage="w-[50%]"
        />
      )}
      {showAddDrugFields && (
        <div>
          <TextInput
            placeHolder="Drug Name"
            value={drugNameInput}
            onChange={(e: any) => setDrugNameInput(e.target.value)}
            widthPercentage="w-full"
          />
          <TextInput
            placeHolder="Drug Dose"
            value={drugDoseInput}
            onChange={(e: any) => setDrugDoseInput(e.target.value)}
            widthPercentage="w-full"
          />
          <TextInput
            placeHolder="Drug Frequency"
            value={drugFrequencyInput}
            onChange={(e: any) => setDrugFrequencyInput(e.target.value)}
            widthPercentage="w-full"
          />
          <TextInput
            placeHolder="Prescribe Physician"
            value={prescribePhysician}
            onChange={(e: any) => setPrescribePhysician(e.target.value)}
            widthPercentage="w-full"
          />
        </div>
      )}
      {showDateField && (
        <DateInput
          placeHolder={dateFieldPlaceHolder!}
          widthPercentage="w-[50%]"
          value={date}
          onChange={(e: any) => setDate(e.target.value)}
        />
      )}

      <MainButton
        buttonText="Add Item"
        onClick={() => {
          if (showAddDrugFields) {
            if (
              drugNameInput === '' ||
              drugDoseInput === '' ||
              drugFrequencyInput === '' ||
              prescribePhysician === ''
            ) {
              alert('Please fill all fields')
            } else {
              list.push({
                drug: {
                  DrugName: drugNameInput,
                  DrugDose: drugDoseInput,
                  DrugFrequency: drugFrequencyInput,
                  PrescribePhysician: prescribePhysician,
                },
              })
            }
            setRefresh(!refresh)
            setDrugNameInput('')
            setDrugDoseInput('')
            setDrugFrequencyInput('')
            setPrescribePhysician('')
          } else {
            if (showDateField) {
              if (
                inputBox !== '' &&
                date !== '' &&
                inputBox !== undefined &&
                date !== undefined &&
                inputBox !== null &&
                date !== null
              ) {
                list.push({ twoItems: { input: inputBox, date: date } })
                setInputBox('')
                setDate('')
              } else {
                alert('Please fill all the fields')
              }
            } else {
              if (
                inputBox !== '' &&
                inputBox !== undefined &&
                inputBox !== null
              ) {
                list.push(inputBox)
                setInputBox('')
              } else {
                alert('Please fill all the fields')
              }
            }
          }
        }}
      />

      {whatTheUserHasAdded}
    </div>
  )
}
export default UserCreatedListFromInputBox
