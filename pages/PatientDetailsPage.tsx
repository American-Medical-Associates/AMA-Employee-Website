import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  selectCompany,
  selectPatientDetails,
} from '../redux/slices/companySlice'
import CustomCheckBox from '../components/formComponents/CustomCheckBox'
import Header from '../components/Header'
import { UpdatePatientInfoWeightLoss } from '../firebase'

export default function PatientDetailsPage() {
  const patientDetails = useSelector(selectPatientDetails)
  const company = useSelector(selectCompany)
  const [weightLossProgram, setWeightLossProgram] = useState(false)

  useEffect(() => {
    // if (patientDetails.isInWeightLossProgram) {
    setWeightLossProgram(patientDetails.isInWeightLossProgram)
    // }
  }, [patientDetails])

  return (
    <div>
      <Header selectCompany={company} routePatientsHome={true} />
      <main>
        <div className="m-5">
          <h1 className=" text-center text-3xl text-[#496eff] ">
            {patientDetails.fullName.toUpperCase()}
          </h1>
          <div className=" flex flex-row justify-center">
            <div className=" flex flex-col justify-center">
              <h1 className=" text-center text-xl font-bold">
                {patientDetails.DOB.slice(0, 2)}/
                {patientDetails.DOB.slice(2, 4)}/
                {patientDetails.DOB.slice(4, 8)}
              </h1>
              <h1 className=" text-md text-center">
                {patientDetails.email.toLowerCase()}
              </h1>
              <h1 className=" text-md text-center">
                {/* format Phone Number */}
                {patientDetails.phoneNumber.slice(0, 3)}-
                {patientDetails.phoneNumber.slice(3, 6)}-
                {patientDetails.phoneNumber.slice(6, 10)}
              </h1>
            </div>
          </div>
          <div className=" my-[300px] flex w-full items-center justify-center">
            <CustomCheckBox
              isChecked={weightLossProgram}
              checkedState={() => {
                setWeightLossProgram(!weightLossProgram)
                UpdatePatientInfoWeightLoss({
                  weightLossProgram: !weightLossProgram,
                  emailValue: patientDetails.email,
                })
              }}
              text="Weight Loss Program"
            />
          </div>
        </div>
      </main>
    </div>
  )
}
