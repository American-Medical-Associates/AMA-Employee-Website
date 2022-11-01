import { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import { useRouter } from 'next/router'
import { MenuItem } from '../../components/MenuItem'
import {
  ClipboardIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
  ComputerDesktopIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline'
import SupportTicket from '../../components/support/SupportTicket'
import SupportAnalytics from '../../components/support/SupportAnalytics'
import OpenTickets from '../../components/support/OpenTickets'
import ClosedTickets from '../../components/support/ClosedTickets'
import { GetSupportTickets } from '../../firebase'
import Datepicker from '../../components/Datepicker'

const TechSupport: NextPage<{}> = () => {
  const router = useRouter()
  const [showSupportTicket, setShowSupportTicket] = useState(false)
  const [showOpenTickets, setShowOpenTickets] = useState(false)
  const [showClosedTickets, setShowClosedTickets] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [supportTickets, setSupportTickets] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  useEffect(() => {
    GetSupportTickets({ supportTicketsState: setSupportTickets })
  }, [])
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
                  <ComputerDesktopIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                }
                text="Create A Support Ticket"
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
                  <CodeBracketIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
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
                  <ClipboardDocumentListIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
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
            <div className="mb-16">
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
            {showAnalytics && (
              <Datepicker
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            )}
          </div>
          <div className="h-[80vh] w-[75%] ">
            {showSupportTicket && <SupportTicket />}
            {showOpenTickets && <OpenTickets supportTickets={supportTickets} />}
            {showClosedTickets && (
              <ClosedTickets supportTickets={supportTickets} />
            )}
            {showAnalytics && (
              <SupportAnalytics
                selectedDate={selectedDate}
                supportTickets={supportTickets}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
export default TechSupport
