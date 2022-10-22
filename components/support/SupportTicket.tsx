import React, { useState } from 'react'
import MainButton from '../MainButton'
import TextInput from '../TextInput'
import LargeTextBox from '../LargeTextBox'
import { useSelector } from 'react-redux'
import { selectCompany } from '../../redux/slices/companySlice'
import { AddSupportTicket } from '../../firebase'
const SupportTicket: React.FC<{}> = () => {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [screenShot, setScreenShot] = useState('')
  const company = useSelector(selectCompany)

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
          setSubject(text.target.value)
        }}
        value={subject}
      />
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
          // AddSupportTicket({
          //   subject: subject,
          //   message: message,
          //   screenShot: screenShot,
          //   company: company,
          // })
        }}
        buttonWidth="w-1/2"
      />
    </div>
  )
}
export default SupportTicket
