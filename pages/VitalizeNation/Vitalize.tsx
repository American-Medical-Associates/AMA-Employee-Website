import React, { useEffect } from 'react'
import Header from '../../components/navigation/Header'
import router, { useRouter } from 'next/router'
import { MenuItem } from '../../components/navigation/MenuItem'
import {
  ChartBarIcon,
  ClipboardIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline'
import { NextPage } from 'next'
import { auth } from '../../firebase/firebase'

const Vitalize: NextPage<{}> = () => {
  const router = useRouter()

  return (
    <div className='bg-gray-100'>
      <Header selectCompany={'Vitalize'} routePatientsHome={true} />
      <main className=" mt-5 flex h-full  w-full flex-col ">
        <h1 className=" text-center text-2xl ">Vitalize</h1>
        <div className=" flex h-[80vh] w-full grid-flow-col items-center justify-center">
          <div className=" h-[80vh] w-[25%] p-5 ">
            <div className="mb-5">
              <MenuItem
                icon={
                  <ClipboardIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                }
                text="Infusion Intake Form"
                onClick={() => {
                  router.push('/VitalizeNation/IVinfusionIntakeForm')
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Vitalize
