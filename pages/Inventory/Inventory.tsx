import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import { MenuItem } from '../../components/MenuItem'
import router, { useRouter } from 'next/router'
import {
  ClipboardDocumentListIcon,
  PencilIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline'
import { auth, editSpravatoTracking, GetSpravatoTracking } from '../../firebase'
import TextInput from '../../components/TextInput'
import Datepicker from '../../components/Datepicker'

const Inventory: NextPage<{}> = () => {
  useEffect(() => {
    if (!auth.currentUser?.email) {
      router.push('/PatientLogin')
    }
  }, [])

  const router = useRouter()
  const [searched, setSearched] = useState('')
  return (
    <div>
      <Header selectCompany={'AMA'} />
      <main className=" mt-8">
        <h1 className=" text-center text-4xl text-[#0008ff]">Inventory</h1>
        <div className=" mt-10 flex flex-row ">
          <div className=" mx-10 flex h-20 w-[23%] flex-col ">
            <MenuItem
              icon={
                <ClipboardDocumentListIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
              }
              text="Inventory"
              onClick={() => {
                router.push('/SpravatoTracking')
              }}
            />
            <MenuItem
              icon={
                <ChartBarIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
              }
              text="History"
              onClick={() => {
                router.push('../Inventory/InventoryHistory')
              }}
            />
          </div>
          <div className="  flex w-[77%] flex-col items-center justify-center p-20">
            <TextInput
              widthPercentage="w-[80%]"
              placeHolder="SN Number"
              onChange={(text: any) => {
                setSearched(text.target.value)
              }}
              value={searched}
              type={'text'}
            />
            {/* {sparavtoTrackingList()} */}
          </div>
        </div>
      </main>
    </div>
  )
}
export default Inventory
