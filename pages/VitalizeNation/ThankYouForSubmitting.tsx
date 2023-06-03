import React, { useEffect } from 'react'
import Header from '../../components/navigation/Header'
import MainButton from '../../components/Buttons/MainButton'
import router, { useRouter } from 'next/router'
import { auth } from '../../firebase'

const ThankYouForSubmitting: React.FC<{}> = () => {
  const router = useRouter()
  return (
    <div>
      <Header selectCompany={'Vitalize'} routePatientsHome={false} />
      <main className="  mt-5 flex h-[80vh] w-[full] flex-col  items-center justify-center ">
        <div className=" flex h-[300px] w-[60%] grid-rows-2 flex-col items-center justify-center rounded-[30px] bg-[#dadada7c]">
          <div className=" mb-32 h-[10%]">
            <MainButton
              buttonText="Back to Intake Form"
              onClick={() => {
                router.push('/VitalizeNation/IVinfusionIntakeForm')
              }}
            />
          </div>
          <div className=" h-[90%]">
            <h1 className=" text-center text-4xl font-bold text-[#565eef] ">
              Thank You For Submitting
            </h1>
          </div>
        </div>
      </main>
    </div>
  )
}
export default ThankYouForSubmitting
