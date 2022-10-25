import { NextPage } from 'next'
import React, { useState } from 'react'
import Header from '../../components/Header'
import { useRouter } from 'next/router'
import { MenuItem } from '../../components/MenuItem'
import {
  ClipboardIcon,
  ChartBarIcon,
  ClipboardListIcon,
  DesktopComputerIcon,
  CodeIcon,
} from '@heroicons/react/outline'
import SupportTicket from '../../components/support/SupportTicket'
import SupportAnalytics from '../../components/support/SupportAnalytics'
import OpenTickets from '../../components/support/OpenTickets'
import ClosedTickets from '../../components/support/ClosedTickets'

const TechSupport: NextPage<{}> = () => {
  const router = useRouter()
  const [showSupportTicket, setShowSupportTicket] = useState(false)
  const [showOpenTickets, setShowOpenTickets] = useState(false)
  const [showClosedTickets, setShowClosedTickets] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
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
                  setShowSupportTicket(true)
                  setShowAnalytics(false)
                  setShowClosedTickets(false)
                  setShowOpenTickets(false)
                }}
              />
            </div>
            <div className="mb-5">
              <MenuItem
                icon={
                  <CodeIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                }
                text="Open Tickets"
                onClick={() => {
                  setShowOpenTickets(true)
                  setShowAnalytics(false)
                  setShowClosedTickets(false)
                  setShowSupportTicket(false)
                }}
              />
            </div>
            <div className="mb-5">
              <MenuItem
                icon={
                  <ClipboardListIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                }
                text="Closed Tickets"
                onClick={() => {
                  setShowClosedTickets(true)
                  setShowOpenTickets(false)
                  setShowAnalytics(false)
                  setShowSupportTicket(false)
                }}
              />
            </div>
            <div className="mb-5">
              <MenuItem
                icon={
                  <ChartBarIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                }
                text="Support Analytics"
                onClick={() => {
                  setShowAnalytics(true)
                  setShowClosedTickets(false)
                  setShowOpenTickets(false)
                  setShowSupportTicket(false)
                }}
              />
            </div>
          </div>
          <div className="h-[80vh] w-[75%] ">
            {showSupportTicket && <SupportTicket />}
            {showOpenTickets && <OpenTickets />}
            {showClosedTickets && <ClosedTickets />}
            {showAnalytics && <SupportAnalytics />}
          </div>
        </div>
      </main>
    </div>
  )
}
export default TechSupport
