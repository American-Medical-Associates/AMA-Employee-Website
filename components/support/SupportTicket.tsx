import React, { useState } from 'react'
import MainButton from '../MainButton'
import TextInput from '../TextInput'
import LargeTextBox from '../LargeTextBox'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCompany,
  setSupportTicketNumber,
} from '../../redux/slices/companySlice'
import {
  AddScreenShotForSupportTicketsStorageAndDB,
  AddSupportTicket,
} from '../../firebase'
import CustomCheckBoxFeild from '../formComponents/CustomCheckBoxFeild'
import CustomYesOrNo from '../formComponents/CustomYesOrNo'
import { auth, functions } from '../../firebase'
import { httpsCallable, getFunctions } from 'firebase/functions'

const SupportTicket: React.FC<{}> = () => {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [screenShot, setScreenShot] = useState('')
  const company = useSelector(selectCompany)
  const [urgent, setUrgent] = useState('')
  const [whatKindOfIssueIsIt, setWhatKindOfIssueIsIt] = useState('')
  const [urgentCallBackPhoneNumber, setUrgentCallBackPhoneNumber] = useState('')
  const [firstName, setFirstName] = useState('')
  const ticketNumber = Math.floor(Math.random() * 1000000000).toString()
  const sendMessageFunction = httpsCallable(functions, 'sendMessage')
  const dispatch = useDispatch()

  const uploadimage = ({ e }: { e: any }) => {
    try {
      const reader = new FileReader()
      if (e.target.files[0]) {
        // console.log(resume)
        const image = e.target.files[0]

        reader.readAsDataURL(e.target.files[0])
        reader.onload = (readEvent) => {
          setScreenShot(readEvent!.target?.result as any)
        }
      }
    } catch (e) {
      alert(e + 'please upload your Resume')
    }
  }

  return (
    <div className=" m-5 flex flex-col items-center justify-center rounded-[30px] bg-[#f6f6f6ba] p-5">
      <TextInput
        placeHolder="Subject"
        widthPercentage="w-1/2"
        onChange={(text: any) => {
          setSubject(text.target.value)
        }}
        value={subject}
      />
      <TextInput
        placeHolder="First Name"
        widthPercentage="w-1/2"
        onChange={(text: any) => {
          setFirstName(text.target.value)
        }}
        value={firstName}
      />
      <CustomCheckBoxFeild
        allowMultipleCheckBoxes={false}
        checkBoxTitles={[
          'Setting up Computer, Printer, Monitor,ect...',
          'Issue with AMA app, or AMA website',
          'Issue with Something the the IT department did NOT make. ECW, Microsoft Teams, ect...',
          'Feature Request',
        ]}
        howManyCheckBoxes={0}
        setCheckBoxValues={setWhatKindOfIssueIsIt}
        checkBoxValues={whatKindOfIssueIsIt}
        title="What Kind Of Issue Is It?"
        marginLeft="ml-[25%]"
      />
      <CustomYesOrNo
        text="Is this Urgent?"
        marginLeft="mr-[30%]"
        CheckState={setUrgent}
      />

      {urgent == 'Yes' && (
        <div className=" flex w-full flex-col items-center justify-center">
          <p className=" my-10 text-red-500">
            If it is urgent zach will get a text message and get back to you as
            soon as possible
          </p>
          <TextInput
            placeHolder="Call back number for urgent issues"
            widthPercentage="w-1/2"
            onChange={(text: any) => {
              setUrgentCallBackPhoneNumber(text.target.value)
            }}
            value={urgentCallBackPhoneNumber}
          />
        </div>
      )}
      <TextInput
        // ref={filePicker}
        type="file"
        widthPercentage="w-[50%]"
        placeHolder="ScreenShot"
        onChange={(text: any) => {
          uploadimage({ e: text })
        }}
      />

      <LargeTextBox
        widthPercentage="w-1/2"
        placeHolder="Please describe your issue"
        onChange={(text: any) => {
          setMessage(text.target.value)
        }}
        value={message}
      />

      <MainButton
        buttonText="Submit"
        onClick={() => {
          if (subject == '') {
            alert('Please enter a subject')
            return
          } else if (firstName == '') {
            alert('Please enter your first name')
            return
          } else if (whatKindOfIssueIsIt == '') {
            alert('Please enter what kind of issue it is')
            return
          } else if (urgent == '') {
            alert('Please enter if this is urgent')
            return
          } else if (urgentCallBackPhoneNumber == '' && urgent == 'Yes') {
            alert('Please enter a call back number')
            return
          } else if (message == '') {
            alert('Please enter a message')
            return
          }
          // else
          // if (screenShot == '') {
          //   alert('Please upload a screenshot')
          //   return
          // }
          else {
            AddSupportTicket({
              subject: subject,
              message: message,

              company: company,
              urgent: urgent,
              whatKindOfIssueIsIt: whatKindOfIssueIsIt,
              urgentCallBackPhoneNumber: urgentCallBackPhoneNumber,
              ticketNumber: ticketNumber,
              firstName: firstName,
            })
              .then(() => {
                if (screenShot != '') {
                  AddScreenShotForSupportTicketsStorageAndDB({
                    subject: subject,
                    ticketNumber: ticketNumber,
                    selectedFile: screenShot,
                  })
                }
              })
              .then(() => {
                if (urgent == 'Yes') {
                  sendMessageFunction({
                    phone: '+16233133383',
                    message: `${firstName} has a urgent issue with ${whatKindOfIssueIsIt} and the ticket number is ${ticketNumber} please call them back at ${urgentCallBackPhoneNumber}.`,
                  })
                }
              })
              .then(() => {
                alert('Ticket Submitted')
              })
          }
        }}
        buttonWidth="w-1/2"
      />
    </div>
  )
}
export default SupportTicket
