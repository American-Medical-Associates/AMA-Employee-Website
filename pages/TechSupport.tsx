import { NextPage } from 'next'
import React, { useState } from 'react'
import Header from '../components/Header'
import { useRouter } from 'next/router'
import { MenuItem } from '../components/MenuItem'
import {
  ClipboardIcon,
  ChartBarIcon,
  ClipboardListIcon,
  DesktopComputerIcon,
} from '@heroicons/react/outline'
import SupportTicket from '../components/support/SupportTicket'

const TechSupport: NextPage<{}> = () => {
  const router = useRouter()
  const [showSupportTicket, setShowSupportTicket] = useState(false)
  return (
    <div>
      <Header selectCompany={'AMA'} />
      <main className=" mt-5 flex h-full  w-full flex-col ">
        <h1 className=" text-center text-2xl ">Tech Support</h1>
        <div className=" flex h-[80vh] w-full grid-flow-col items-center justify-center">
          <div className=" h-[80vh] w-[25%] p-5 ">
            <div className="mb-5">
              <MenuItem
                icon={
                  <DesktopComputerIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                }
                text="Support Ticket"
                onClick={() => {
                  setShowSupportTicket(!showSupportTicket)
                }}
              />
            </div>
          </div>
          <div className="h-[80vh] w-[75%] ">
            {showSupportTicket && <SupportTicket />}
          </div>
        </div>
      </main>
    </div>
  )
}
export default TechSupport
