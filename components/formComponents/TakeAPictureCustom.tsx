import React, { useState } from 'react'
import Camera from '../camera'
import MainButton from '../MainButton'
import TextInput from '../TextInput'
import Compressor from 'compressorjs'

const TakeAPictureCustom: React.FC<{
  text: string
  picture: any
  setPicture: any
  key: number
  id?: string
}> = ({ text, picture, setPicture, key, id }) => {
  const [pictureUpload, setPictureUpload] = useState(false)

  const uploadimage = ({ e }: { e: any }) => {
    try {
      const reader = new FileReader()
      if (e.target.files[0]) {
        // console.log(resume)
        const image = e.target.files[0]
        //reduce the size of the image to 1048487 bites
        if (image.size > 1048487) {
          //reduce the size of the image to 1048487 bites
          // reader.readAsDataURL(image)
          // reader.onloadend = () =>
          //   new Compressor(image, {
          //     quality: 0.6,
          //     success(result) {
          //       setPicture(result)
          //       setPictureUpload(true)
          //     },
          //     error(err) {
          //       alert(err)
          //     },
          //   })

          const reader = new FileReader()
          reader.readAsDataURL(image)
          reader.onload = (readEvent) => {
            const img = new Image()
            img.src = readEvent!.target?.result as any
            img.onload = (loadEvent) => {
              const canvas = document.createElement('canvas')
              const ctx = canvas.getContext('2d')
              canvas.width = 1600
              canvas.height = 1600
              ctx?.drawImage(img, 0, 0, 1600, 1600)
              const dataUrl = canvas.toDataURL('image/jpeg')
              //format data url to blob
              const arr = dataUrl.split(',')
              const mime = arr[0].match(/:(.*?);/)![1]
              const bstr = atob(arr[1])
              let n = bstr.length
              const u8arr = new Uint8Array(n)
              while (n--) {
                u8arr[n] = bstr.charCodeAt(n)
              }
              const blob = new Blob([u8arr], { type: mime })
              //et blob to base64
              const reader = new FileReader()
              reader.readAsDataURL(blob)
              reader.onloadend = () => {
                const base64data = reader.result
                setPicture(base64data as any)
              }
            }
          }

          alert(
            'image is too big, we are gonna try to reduce this photos size, finish filling out New Patient Packet and notify the front desk to make sure that the photo uploaded properly.'
          )
        } else {
          //upload the image at its original size
          reader.readAsDataURL(image)
          reader.onloadend = () => {
            setPicture(reader.result)
            setPictureUpload(true)
          }
        }
      }
    } catch (e) {
      alert(e)
    }
  }

  return (
    <div id={id} className=" my-10 flex flex-col items-center justify-center">
      <h3 className="text-center text-2xl text-[#616161]">{text}</h3>
      <MainButton
        buttonText="upload picture"
        onClick={() => {
          setPictureUpload(!pictureUpload)
        }}
        buttonWidth="w-20%"
      />
      {pictureUpload && (
        <div className="flex w-full flex-col items-center justify-center">
          <TextInput
            // ref={filePicker}
            type="file"
            widthPercentage="w-[50%]"
            placeHolder="Upload a Resume"
            onChange={(text: any) => {
              uploadimage({ e: text })
            }}
          />
          {picture && (
            <div className="flex w-full flex-col items-center justify-center">
              {/* show the image that was uploaded */}
              <img
                src={picture}
                alt="uploaded"
                className="h-[50%] w-[50%] object-contain"
              />

              <MainButton
                buttonText="Remove"
                onClick={() => {
                  setPictureUpload(false)
                  setPicture('')
                }}
              />
            </div>
          )}
        </div>
      )}
      {/* <Camera key={key} picture={picture} setPicture={setPicture} /> */}
    </div>
  )
}

export default TakeAPictureCustom
