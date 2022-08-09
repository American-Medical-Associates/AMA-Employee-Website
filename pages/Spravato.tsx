import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import { MenuItem } from '../components/MenuItem'
import { useRouter } from 'next/router'
import { ClipboardListIcon } from '@heroicons/react/outline'
import { GetSpravatoTracking } from '../firebase'

const Spravato: NextPage<{}> = () => {
  const [spravtoTrackingArray, setSpravtoTrackingArray] = useState<Array<any>>(
    []
  )
  const router = useRouter()
  useEffect(() => {
    GetSpravatoTracking({ SpravatoTrackingArray: setSpravtoTrackingArray })
    console.log(spravtoTrackingArray)
  }, [])

  const sparavtoTrackingList = () => {
    const list = spravtoTrackingArray.map((item) => {
      return (
        <div
          key={item.phoneNumber}
          onClick={() => {
            // setApplicationDetails({ item })
            // console.log('hiiiii' + item)
          }}
          className=" m-4  flex  cursor-pointer overflow-x-hidden rounded-[30px] bg-[#f9f9f9]  p-4   text-center shadow-xl duration-500 hover:scale-[110%]"
        >
          <h1 className=" mx-5  text-center text-lg text-[#707070]">
            {item.firstName}
          </h1>
          <h1 className="mx-5  text-center text-lg text-[#707070]">
            {item.lastName}
          </h1>
          <h1 className="  text-center text-lg text-[#707070]">{item.email}</h1>
          <h1 className="  text-center text-lg text-[#707070]">
            {item.dateAdministeredString}
          </h1>
        </div>
      )
    })
    return list
  }
  return (
    <div>
      <Header />
      <main className=" mt-8">
        <h1 className=" text-center text-4xl text-[#0008ff]">Spravato</h1>
        <div className=" mt-10 flex flex-row ">
          <div className=" mx-10 flex h-20 w-[23%] ">
            <MenuItem
              icon={
                <ClipboardListIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
              }
              text="Spravato Tracking Sheet"
              onClick={() => {
                router.push('/SpravatoTracking')
              }}
            />
          </div>
          <div className=" \ flex w-[77%] flex-col items-center justify-center">
            {sparavtoTrackingList()}
          </div>
        </div>
      </main>
    </div>
  )
}
export default Spravato
