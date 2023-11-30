import React, { useState, useEffect } from 'react'
import {
  AddPersonWorkingOnSupportTicket,
  CloseSupportTicket,
  CreateChannelMessageToSupport,
  GetSupportTickets,
} from '../../firebase/firebase'
import { MenuItem } from '../navigation/MenuItem'

import { auth, functions, AddNoteToSupportTicket } from '../../firebase/firebase'
import ClosedTickets from './ClosedTickets'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCompany,
  setSupportTicketNumber,
  setChannelID,
} from '../../redux/slices/companySlice'
import { CircularButton } from '../Buttons/CircularButtonIcon'
import {
  PaperAirplaneIcon,
  WrenchIcon,
  XMarkIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline'
import LargeTextBox from '../userInput/LargeTextBox'

const OpenTickets: React.FC<{ supportTickets: any }> = ({ supportTickets }) => {
  const dispatch = useDispatch()
  const company = useSelector(selectCompany)
  const [writeNotes, setWriteNotes] = useState(false)
  const [notes, setNotes] = useState('')
  const [selectedTicket, setSelectedTicket] = useState('')

  const router = useRouter()

  const tickets = supportTickets.map((ticket: any) => {
    //format cell phone number
    const phoneNumber = ticket.urgentCallBackPhoneNumber
    const formattedPhoneNumber = `(${phoneNumber.slice(
      0,
      3
    )}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
    //show photo from url
    const screenShot = ticket.screenShot
    //convert firebase timestamp to hours and minutes
    const time = ticket.timestamp.toDate()
    const hours = time.getHours()
    var minutes = time.getMinutes()
    if (minutes < 10) {
      minutes = `0${minutes}`
    }
    //add am or pm
    var amOrPm = 'am'
    if (hours > 12) {
      amOrPm = 'pm'
    }
    //format date
    const date = `${
      time.getMonth() + 1
    }/${time.getDate()}/${time.getFullYear()}`

    const formattedTime = `${hours}:${minutes}${amOrPm}`

    if (ticket.openTicket == true || ticket.openTicket == undefined) {
      return (
        <div className="my-10 flex flex-col items-center justify-center rounded-[30px] bg-[#f6f6f6ba]">
          <div className=" grid-row-4   flex   h-[80px] w-full  flex-row rounded-[20px] bg-[#d3d3d39d]">
            <div className=" w-[25%] flex-row p-5">
              <div className=" text-[#4a6ee4] underline">{date}</div>
              <div className=" text-[#4a6ee4] underline">{formattedTime}</div>
            </div>
            <div className=" flex w-[25%] flex-col items-center justify-center  ">
              {/* {ticket.email == auth.currentUser?.email && (
                <MenuItem
                  icon={
                    <PaperAirplaneIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                  }
                  text="Message"
                  onClick={() => {
                    CreateChannelMessageToSupport({
                      ticketNumber: ticket.ticketNumber,
                      company: company,
                    })
                    dispatch(setChannelID(ticket.ticketNumber))
                    router.push('/MessagingPage')
                  }}
                />
              )} */}
            </div>
            <div className="mx-5 flex w-[25%] flex-col items-center justify-center  ">
              {ticket.workingOnTicket == false && (
                <MenuItem
                  icon={
                    <WrenchIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                  }
                  text="Working"
                  onClick={() => {
                    AddPersonWorkingOnSupportTicket({
                      ticketNumber: ticket.ticketNumber,
                    })
                  }}
                />
              )}
              {ticket.workingOnTicket == true && (
                <div>
                  <p className="text-sm text-[#3f6df8]">
                    {ticket.personWorkingOnTicket}
                  </p>
                  <p>is working on it.</p>
                </div>
              )}
            </div>
            <div className=" mr-5 flex w-[25%] flex-col items-center justify-center  ">
              <MenuItem
                icon={
                  <XMarkIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                }
                text="Close Ticket"
                onClick={() => {
                  if (ticket.note) {
                    CloseSupportTicket({
                      ticketNumber: ticket.ticketNumber,
                      openTicketState: false,
                    })
                  } else {
                    alert('Please add a note before closing the ticket.')
                  }
                }}
              />
            </div>
          </div>
          <div className=" flex w-[85%] flex-col items-center justify-center  p-10">
            <div className=" flex w-full flex-col items-center  justify-between text-center">
              {ticket.urgent === 'Yes' && (
                <div className="  text-2xl font-bold text-[#f00000fe]">
                  {ticket.subject.toUpperCase()}
                </div>
              )}
              {ticket.urgent === 'No' && (
                <div className="  text-2xl font-bold text-[#4a6ee4]">
                  {ticket.subject.toUpperCase()}
                </div>
              )}
              <div className="mb-5 text-lg font-bold text-[#b7b7b7]">
                {ticket.ticketNumber}
              </div>

              <div className=" mb-5 text-center text-lg font-bold text-[#7c7c7c]">
                Person who Submitted:
                <span className="text-[#252525]"> {ticket.firstName}</span>
                <p className=" text-sm text-[#4e6cf2]">{ticket.email}</p>
              </div>
              <div className="text-lg font-bold text-[#7c7c7c] ">
                Urgent:
                <span className="text-lg font-bold text-[#e54848]">
                  {ticket.urgent}
                </span>
              </div>
              {ticket.urgent === 'Yes' && (
                <div className=" mb-5 text-lg font-bold text-[#f34242]">
                  <span className="text-[#7c7c7c]">Call Back Number: </span>
                  {formattedPhoneNumber}
                </div>
              )}
            </div>
            <div className=" font-bold text-[#424242]">
              {ticket.whatKindOfIssueIsIt}
            </div>

            <div className=" my-10 text-center text-lg font-bold text-[#7c7c7c]">
              Message:
              <p className=" text-center text-black"> {ticket.message}</p>
            </div>

            {screenShot && (
              <div className=" mt-5 flex items-center justify-center">
                <img src={screenShot} className=" w-1/2 rounded-[25px]" />
              </div>
            )}
            <div>
              {ticket.note && (
                <div className=" mt-5 rounded-[25px] bg-[#bbbbbb49] p-3 text-center text-lg font-bold text-[#7c7c7c]">
                  Note:
                  <p className=" text-center text-black"> {ticket.note}</p>
                  <p>Author: {ticket.noteBy}</p>
                </div>
              )}
            </div>
            <section className=" mt-10 flex w-full items-center justify-center">
              {!writeNotes && selectedTicket != ticket.ticketNumber && (
                <CircularButton
                  icon={
                    <PencilSquareIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                  }
                  onClick={() => {
                    setWriteNotes(!writeNotes)
                    setSelectedTicket(ticket.ticketNumber)
                  }}
                />
              )}
              {writeNotes && selectedTicket == ticket.ticketNumber && (
                <div className=" flex w-full flex-col items-center justify-center rounded-[25px] bg-[#d6d6d62b]  p-5 ">
                  <div className=" flex w-full justify-end ">
                    <CircularButton
                      icon={
                        <XMarkIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                      }
                      onClick={() => {
                        setWriteNotes(!writeNotes)
                        setSelectedTicket('')
                      }}
                    />
                  </div>
                  <LargeTextBox
                    widthPercentage="w-[90%]"
                    placeHolder="Ticket Notes"
                    value={notes}
                    onChange={(text: any) => {
                      setNotes(text.target.value)
                    }}
                  />
                  <CircularButton
                    icon={
                      <PencilSquareIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                    }
                    onClick={() => {
                      AddNoteToSupportTicket({
                        ticketNumber: ticket.ticketNumber,
                        note: notes,
                      }).then(() => {
                        setNotes('')
                        setWriteNotes(!writeNotes)
                        setSelectedTicket('')
                      })
                    }}
                  />
                </div>
              )}
            </section>
          </div>
        </div>
      )
    }
  })

  return (
    <div className=" m-5 flex flex-col items-center justify-center rounded-[30px]  p-5">
      <div>{tickets}</div>
    </div>
  )
}
export default OpenTickets
