import React, { useState, useEffect } from 'react'

import {
  AddPersonWorkingOnSupportTicket,
  CloseSupportTicket,
  GetSupportTickets,
} from '../../firebase'
import { MenuItem } from '../MenuItem'
import {
  ChartBarIcon,
  CubeIcon,
  XMarkIcon,
  FolderOpenIcon,
} from '@heroicons/react/24/outline'
import { auth, functions } from '../../firebase'

const ClosedTickets: React.FC<{ supportTickets: any }> = ({
  supportTickets,
}) => {
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

    if (ticket.openTicket == false) {
      return (
        <div className="my-10 flex w-[85%] flex-col items-center justify-center rounded-[30px] bg-[#f6f6f6ba]">
          <div className=" grid-row-4   flex   h-[80px] w-full  flex-row rounded-[20px] bg-[#d3d3d39d]">
            <div className=" w-[25%] flex-row p-5">
              <div className=" text-[#4a6ee4] underline">{date}</div>
              <div className=" text-[#4a6ee4] underline">{formattedTime}</div>
            </div>
            <div className=" flex w-[25%] flex-col items-center justify-center  ">
              {/* <MenuItem
                icon={
                  <CubeIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                }
                text="Close Ticket"
                onClick={() => {}}
              /> */}
            </div>
            <div className="mx-5 flex w-[25%] flex-col items-center justify-center  ">
              {/* {ticket.workingOnTicket == false && (
                <MenuItem
                  icon={
                    <CubeIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                  }
                  text="Working"
                  onClick={() => {
                    AddPersonWorkingOnSupportTicket({
                      ticketNumber: ticket.ticketNumber,
                    })
                  }}
                />
              )} */}
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
                  <FolderOpenIcon className=" h-10 w-7 cursor-pointer  text-black duration-[500s] ease-in" />
                }
                text="ReOpen Ticket"
                onClick={() => {
                  CloseSupportTicket({
                    ticketNumber: ticket.ticketNumber,
                    openTicketState: true,
                  })
                }}
              />
            </div>
          </div>
          <div className=" flex flex-col items-center justify-center  p-10">
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
            <div className=" mt-5 rounded-[25px] bg-[#bbbbbb49] p-3 text-center text-lg font-bold text-[#7c7c7c]">
              Note:
              <p className=" text-center text-black"> {ticket.note}</p>
              <p>Author: {ticket.noteBy}</p>
            </div>
          </div>
        </div>
      )
    }
  })

  return (
    <div className="  m-5 flex flex-col items-center justify-center rounded-[30px]  p-5">
      <div>{tickets}</div>
    </div>
  )
}
export default ClosedTickets
