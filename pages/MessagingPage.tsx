import React, { useEffect, useState } from 'react'

import { MenuItem } from '../components/navigation/MenuItem'
import router, { useRouter } from 'next/router'
import { NextPage } from 'next'
import { auth, getMessages } from '../firebase/firebase'
import {
  selectSupportTicketNumber,
  selectChannelID,
} from '../redux/slices/companySlice'
import { useDispatch, useSelector } from 'react-redux'
import TextInput from '../components/userInput/TextInput'
import { CircularButton } from '../components/Buttons/CircularButtonIcon'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'

const MessagingPage: NextPage<{}> = () => {
  const [allSupportMessages, setAllSupportMessages] = useState([])
  const ChannelID = useSelector(selectChannelID)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!auth.currentUser?.email) {
      router.push('/PatientLogin')
    }
  }, [])

  useEffect(() => {
    // if (ChannelID) {
    //   getMessages({
    //     ChannelID: ChannelID,
    //     messagesState: setAllSupportMessages,
    //   })
    // }
  }, [ChannelID])

  // const listOfChannels = ChannelID.map((channel: any) => {
  //   return (
  //     <div key={channel.id}>
  //       <div className="flex flex-col">
  //         <h2>{ChannelID.id}</h2>
  //       </div>
  //     </div>
  //   )
  // })

  const messages = allSupportMessages.map((message: any) => {
    return (
      <div className=" ">
        <div className="gid- flex flex-col items-center justify-center"></div>
        <p>{message.message} </p>
      </div>
    )
  })
  return (
    <div>
      <div></div>
      <main className=" flex w-full grid-cols-2">
        {/* <div className=" h-[87vh] w-[25%] flex-col ">{listOfChannels}</div> */}
        <div className=" flex w-[75%] grid-rows-2 flex-col">
          <div className=" flex h-[90%] flex-col">{messages}</div>
          <div className=" flex h-[10%] grid-cols-2 items-center justify-start">
            <div className=" mx-4 w-[80%]">
              <TextInput
                placeHolder="Type a message"
                onChange={(text: any) => {
                  setMessage(text.target.value)
                }}
                widthPercentage={'w-full'}
                value={message}
              />
            </div>
            <div className=" w-[20%]">
              <CircularButton
                onClick={() => {}}
                icon={
                  <PaperAirplaneIcon className=" h-10 w-7 cursor-pointer  text-[#0008ff] duration-[500s] ease-in" />
                }
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
export default MessagingPage
