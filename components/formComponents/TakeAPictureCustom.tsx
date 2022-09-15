import React, { useState } from 'react'
import Camera from '../camera'
import MainButton from '../MainButton'
import TextInput from '../TextInput'

const TakeAPictureCustom: React.FC<{
  text: string
  picture: any
  setPicture: any
}> = ({ text, picture, setPicture }) => {
  const [pictureUpload, setPictureUpload] = useState(false)
  const uploadimage = ({ e }: { e: any }) => {
    try {
      const reader = new FileReader()
      if (e.target.files[0]) {
        // console.log(resume)
        const image = e.target.files[0]

        // if (image.type.search('pdf') > -1) {
        //   setResumeFileType('pdf')
        // }
        reader.readAsDataURL(e.target.files[0])
        reader.onload = (readEvent) => {
          setPicture(readEvent!.target?.result as any)
        }
      }
    } catch (e) {
      alert(e + 'please upload your Resume')
    }
  }
  return (
    <div className=" my-10 flex flex-col items-center justify-center">
      <h3 className="text-center text-2xl text-[#616161]">{text}</h3>
      <MainButton
        buttonText="upload picture"
        onClick={() => {
          setPictureUpload(!pictureUpload)
        }}
        buttonWidth="w-20%"
      />
      {pictureUpload && (
        <TextInput
          // ref={filePicker}
          type="file"
          widthPercentage="w-[50%]"
          placeHolder="Upload a Resume"
          onChange={(text: any) => {
            uploadimage({ e: text })
          }}
        />
      )}
      <Camera picture={picture} setPicture={setPicture} />
    </div>
  )
}

export default TakeAPictureCustom
