import { NextPage } from 'next'
import React from 'react'
import TextInput from '../components/TextInput'

const EmailPage: NextPage<{}> = () => {
  return (
    <div>
      <TextInput
        // ref={filePicker}
        type="file"
        widthPercentage="w-[50%]"
        placeHolder="Upload a Pdf"
        onChange={(text: any) => {
          //   uploadimage({ e: text })
        }}
      />
    </div>
  )
}
export default EmailPage
