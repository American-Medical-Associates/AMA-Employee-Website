import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  selectCompany,
  selectPatientDetails,
} from '../redux/slices/companySlice'
import CustomCheckBox from '../components/formComponents/CustomCheckBox'
import Header from '../components/Header'
import { UpdatePatientInfoWeightLoss, getPatientForms } from '../firebase'
import MainButton from '../components/MainButton'
import WeightLossPacketFullSubmission from '../components/formComponents/WeightLossFullPacketSubmission'

export default function PatientDetailsPage() {
  const patientDetails = useSelector(selectPatientDetails)

  const [weightLossProgram, setWeightLossProgram] = useState(false)
  const [weightLossPacket, setWeightLossPacket] = useState([] as any)
  const company = useSelector(selectCompany)

  useEffect(() => {
    getPatientForms({
      selectedForm: 'WeightLoss',
      setPatientDocs: setWeightLossPacket,
    })
  }, [])
  // console.log(weightLossPacket)

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
      <Header selectCompany={company} routePatientsHome={true} />
      <main className="  my-[50px] flex flex-col items-center justify-center">
        {/* differnt files for patient, docs, contracts etc */}
        <div className=" flex h-[20%] w-full flex-row justify-center overflow-x-auto  px-10 ">
          <div className=" mr-5 ml-[200px]">
            <MainButton
              buttonText="Weight Loss Packet"
              buttonWidth="w-[250px]"
              onClick={() => {}}
            />
          </div>
        </div>

        <div className=" flex w-full flex-row">
          {/* settings Panel */}
          <div className=" flex h-full w-[45%] p-2 ">
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
          <div className="w-[55%] overflow-y-auto overflow-x-clip ">
            <WeightLossPacketFullSubmission
              selectedPacket={weightLossPacket[0]}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
