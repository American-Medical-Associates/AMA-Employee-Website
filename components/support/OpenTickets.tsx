import React, { useState, useEffect } from 'react'
import { GetSupportTickets } from '../../firebase'

const OpenTickets: React.FC<{}> = () => {
  const [supportTickets, setSupportTickets] = useState([])
  useEffect(() => {
    GetSupportTickets({ supportTicketsState: setSupportTickets })
  }, [])
  const tickets = supportTickets.map((ticket: any) => {
    //format cell phone number
    const phoneNumber = ticket.urgentCallBackPhoneNumber
    const formattedPhoneNumber = `(${phoneNumber.slice(
      0,
      3
    )}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
    //show photo from url
    const screenShot = ticket.screenShot

    return (
      <div className="my-10 flex flex-col items-center justify-center rounded-[30px] bg-[#f6f6f6ba] p-10">
        <div className=" flex w-full flex-col items-center  justify-between text-center">
          {ticket.urgent === 'Yes' && (
            <div className="  text-2xl font-bold text-[#e54848]">
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
      </div>
    )
  })

  return (
    <div className=" m-5 flex flex-col items-center justify-center rounded-[30px]  p-5">
      <div>{tickets}</div>
    </div>
  )
}
export default OpenTickets
