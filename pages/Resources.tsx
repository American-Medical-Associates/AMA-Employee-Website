import React from 'react'
import Header from '../components/Header'
import { MenuItem } from '../components/MenuItem'
import { useRouter } from 'next/router'
import {
  ChartBarIcon,
  ClipboardIcon,
  ClipboardListIcon,
} from '@heroicons/react/outline'
import { NextPage } from 'next'

const Resources: NextPage<{}> = () => {
  const router = useRouter()
  return (
    <div className=" flex flex-col items-center justify-center">
      <Header />
      <div className=" mt-5 flex h-full  w-full flex-col ">
        <h1 className=" text-center text-2xl ">Resources</h1>
        <div className=" flex h-[80vh] w-full grid-flow-col items-center justify-center">
          <div className=" h-[80vh] w-[25%] p-5 ">
            <div className="mb-5">
              <MenuItem
                icon={
                  <ClipboardIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                }
                text="New Patient Packet"
                onClick={() => {
                  router.push('/NewPatientPacket')
                }}
              />
            </div>
            <div className="mb-5">
              <MenuItem
                icon={
                  <ChartBarIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                }
                text="Analytics"
                onClick={() => {
                  router.push('/NewPatientPacket')
                }}
              />
            </div>
            <MenuItem
              icon={
                <ClipboardListIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
              }
              text="Submissions"
              onClick={() => {
                router.push('/FormSubmissions')
              }}
            />
          </div>
          <div className="h-[80vh] w-[75%] "></div>
        </div>
      </div>
    </div>
  )
}
export default Resources
