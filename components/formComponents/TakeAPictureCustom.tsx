import React, { useState } from 'react'
import Camera from '../camera'
import MainButton from '../MainButton'
import TextInput from '../TextInput'
//import Compressor from 'compressorjs'

const TakeAPictureCustom: React.FC<{
  text: string
  picture: any
  setPicture: any
  key: number
  id?: string
  required?: boolean
  missing?: boolean
}> = ({ text, picture, setPicture, key, id, required, missing }) => {
  const [pictureUpload, setPictureUpload] = useState(false)
  const [displayInfoBefore, setDisplayInfoBefore] = useState('')
  const [displayInfoAfter, setDisplayInfoAfter] = useState('')

  if (required) {
    if (picture === '') {
      missing = true
    } else {
      missing = false
    }
  }

  function calculateSize(img: any, maxWidth: any, maxHeight: any) {
    let width = img.width
    let height = img.height

    // calculate the width and height, constraining the proportions
    if (width > height) {
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width)
        width = maxWidth
      }
    } else {
      if (height > maxHeight) {
        width = Math.round((width * maxHeight) / height)
        height = maxHeight
      }
    }
    return [width, height]
  }

  const uploadimage = ({ e }: { e: any }) => {
    try {
      const reader = new FileReader()
      if (e.target.files[0]) {
        const file = e.target.files[0]
        //reduce the size of the image to 1048487 bites
        // if (file.size > 1048487) {
        //reduce the size of the image to 1048487 bites

        const MAX_WIDTH = 820
        const MAX_HEIGHT = 680
        const MIME_TYPE = 'image/jpeg'
        const QUALITY = 0.9
        const img = new Image()
        img.src = window.URL.createObjectURL(file)
        img.onload = () => {
          const [width, height] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT)
          const elem = document.createElement('canvas')
          elem.width = width
          elem.height = height
          const ctx = elem.getContext('2d')
          if (ctx) {
            // reduce image quality to 0.7

            ctx.drawImage(img, 0, 0, width, height)
            ctx.canvas.toBlob(
              (blob: any) => {
                const newFile = new File([blob], 'image.jpg', {
                  type: MIME_TYPE,
                  lastModified: Date.now(),
                })
                //determine the size extension of the image
                const size = newFile.size
                const sizeInKb = size / 1024
                const sizeInMb = sizeInKb / 1024

                const sizeOrdinal = file.size
                const sizeInKbOrdinal = sizeOrdinal / 1024
                const sizeInMbOrdinal = sizeInKbOrdinal / 1024
                reader.readAsDataURL(newFile)
                reader.onloadend = () => {
                  setPicture(reader.result)
                  setPictureUpload(true)

                  if (sizeInMb < 1) {
                    setDisplayInfoAfter(`image size: ${sizeInKb} kb`)
                  } else {
                    setDisplayInfoAfter(`image size: ${sizeInMb} mb`)
                  }
                  if (sizeInMbOrdinal < 1) {
                    setDisplayInfoBefore(`image size: ${sizeInKbOrdinal} kb`)
                  } else {
                    setDisplayInfoBefore(`image size: ${sizeInMbOrdinal} mb`)
                  }
                }
              },
              MIME_TYPE,
              QUALITY
            )
          }
        }
        // } else {
        //   reader.readAsDataURL(file)
        //   reader.onloadend = () => {
        //     setPicture(reader.result)
        //     setPictureUpload(true)
        //   }
        // }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      id={id}
      className={` ${missing ? 'bg-[#ff1818]' : undefined} ${
        missing ? 'w-[80%]' : undefined
      } ${
        missing ? 'rounded-[25px]' : undefined
      } my-10 flex flex-col items-center justify-center `}
    >
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
            widthPercentage="w-full"
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
              <p>
                {displayInfoBefore} {displayInfoAfter}
              </p>
            </div>
          )}
        </div>
      )}
      {/* <Camera key={key} picture={picture} setPicture={setPicture} /> */}
    </div>
  )
}

export default TakeAPictureCustom
