import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import {
  selectCompany,
  selectPatientDetails,
} from '../redux/slices/companySlice'
import CustomCheckBox from '../components/formComponents/CustomCheckBox'

import {
  UpdatePatientInfoWeightLoss,
  getPatientForms,
} from '../firebase/firebase'
import MainButton from '../components/Buttons/MainButton'
import WeightLossPacketFullSubmission from '../components/formComponents/WeightLossFullPacketSubmission'
import { MenuItem } from '../components/navigation/MenuItem'
import submittedControlledSubstanceContract from '../components/formComponents/submittedControlledSubstanceContract'
import { CircularButton } from '../components/Buttons/CircularButtonIcon'
import { PencilIcon } from '@heroicons/react/24/outline'
import { ro } from 'date-fns/locale'
import { useRouter } from 'next/router'
import { set } from 'date-fns'
import submittedPhentermineContractForm from '../components/formComponents/submittedPhentermineContractForm'

export default function PatientDetailsPage() {
  const patientDetails = useSelector(selectPatientDetails)

  const pdfRef = useRef(null)

  const [selectControlledSubstance, setSelectControlledSubstance] =
    useState(false)
  const [selectPhentermineContract, setSelectPhentermineContract] =
    useState(false)
  const [selectWeightLossPacket, setSelectWeightLossPacket] = useState(false)

  const [weightLossProgram, setWeightLossProgram] = useState(false)
  const [weightLossPacket, setWeightLossPacket] = useState([] as any)
  const [controlledSubstanceForm, setControlledSubstanceForm] = useState(
    [] as any,
  )
  const [phentermineContractForm, setPhentermineContractForm] = useState(
    [] as any,
  )

  const company = useSelector(selectCompany)

  const router = useRouter()

  useEffect(() => {
    // if (patientDetails.isInWeightLossProgram) {
    setWeightLossProgram(patientDetails?.isInWeightLossProgram)
    // }
  }, [patientDetails])

  //format date example '11111111' => 11/11/1111
  const formatDate = (date: string) => {
    if (!date) {
      return 'N/A'
    }

    const year = date.slice(0, 4)
    const month = date.slice(4, 6)
    const day = date.slice(6, 8)

    return `${month}/${day}/${year}`
  }

  return (
    <div>
      <main className="  my-[10px] flex flex-col items-center justify-center">
        {/* differnt files for patient, docs, contracts etc */}
        <div className=" z-50 flex h-[100px] w-full flex-row items-center justify-center overflow-x-auto px-10 ">
          <div className=" mx-5 w-[200px]">
            <MenuItem
              onClick={() => {
                getPatientForms({
                  selectedForm: 'WeightLoss',
                  setPatientDocs: setWeightLossPacket,
                  patientEmail: patientDetails?.email,
                })
                setControlledSubstanceForm([])
                setPhentermineContractForm([])
                setSelectWeightLossPacket(true)
                setSelectControlledSubstance(false)
                setSelectPhentermineContract(false)
              }}
              text="Weight Loss Packet"
            />
          </div>
          <div className=" mx-5 w-[300px]">
            <MenuItem
              onClick={() => {
                getPatientForms({
                  selectedForm: 'Controlled Substance Contract',
                  setPatientDocs: setControlledSubstanceForm,
                  patientEmail: patientDetails?.email,
                })

                setWeightLossPacket([])
                setPhentermineContractForm([])
                setSelectControlledSubstance(true)
                setSelectWeightLossPacket(false)
              }}
              text="Controlled Substance Contract"
            />
          </div>

          <div className="w-[300px]">
            <MenuItem
              onClick={() => {
                getPatientForms({
                  selectedForm: 'Phentermine Contract',
                  setPatientDocs: setPhentermineContractForm,
                  patientEmail: patientDetails?.email,
                })
                setWeightLossPacket([])
                setControlledSubstanceForm([])
                setSelectPhentermineContract(true)
                setSelectWeightLossPacket(false)
                setSelectControlledSubstance(false)
                console.log(phentermineContractForm)
              }}
              text="Phentermine Contract Form"
            />
          </div>
        </div>

        <div className=" flex w-full flex-row">
          {/* settings Panel */}
          <div className=" sticky top-20 flex h-full w-[45%] p-2 ">
            <div className=" flex h-[600px] w-full flex-col items-center rounded-3xl bg-[#d8d7d77b]">
              {/* <h1 className="text-white">Weight Loss Packet</h1> */}
              <div className="flex h-[12%] w-full flex-col items-center justify-center rounded-t-3xl bg-[#bbbbbb]  p-2">
                <h1 className="text-center text-3xl text-white">
                  {patientDetails?.fullName.toUpperCase()}
                </h1>
                <h3 className="text-center text-xl text-white">
                  {formatDate(patientDetails?.DOB)}
                </h3>
              </div>
              <div className="m-5">
                <CustomCheckBox
                  isChecked={weightLossProgram}
                  checkedState={() => {
                    setWeightLossProgram(!weightLossProgram)
                    UpdatePatientInfoWeightLoss({
                      weightLossProgram: !weightLossProgram,
                      emailValue: patientDetails?.email,
                    })
                  }}
                  text="Weight Loss Program"
                />
              </div>
            </div>
          </div>
          {/* place to view any selcted doc */}
          <div
            className='className=" bg-black"
           w-[55%] flex-col overflow-y-auto overflow-x-clip'
          >
            <div className="flex w-full items-center justify-end  px-5 py-2">
              {weightLossPacket.length == 0 && (
                <CircularButton
                  icon={
                    <PencilIcon className="  h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                  }
                  onClick={() => {
                    {
                      selectControlledSubstance
                        ? router.push('/allForms/ControlledSubstanceContract')
                        : selectPhentermineContract
                          ? router.push('/allForms/PhentermineContractForm')
                          : null
                    }
                  }}
                />
              )}
            </div>
            <div className="flex w-full items-center justify-center overflow-y-auto overflow-x-clip  ">
              {weightLossPacket.length > 0 && (
                <WeightLossPacketFullSubmission
                  selectedPacket={weightLossPacket[0]}
                />
              )}
            </div>
            <div className="flex w-full items-center justify-center overflow-y-auto overflow-x-clip  ">
              {controlledSubstanceForm.length > 0 &&
                submittedControlledSubstanceContract({
                  selectedPacket: controlledSubstanceForm[0],
                  pdfRef: pdfRef,
                })}
            </div>
            <div className="flex w-full items-center justify-center overflow-y-auto overflow-x-clip  ">
              {phentermineContractForm.length > 0 &&
                submittedPhentermineContractForm({
                  selectedPacket: phentermineContractForm[0],
                  pdfRef: pdfRef,
                })}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
