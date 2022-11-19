import { fil } from 'date-fns/locale'
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
}> = ({ text, picture, setPicture, key, id }) => {
  const [pictureUpload, setPictureUpload] = useState(false)
  const [displayInfoBefore, setDisplayInfoBefore] = useState('')
  const [displayInfoAfter, setDisplayInfoAfter] = useState('')

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
        // console.log(resume)
        const file = e.target.files[0]
        //reduce the size of the image to 1048487 bites
        if (file.size > 1048487) {
          //reduce the size of the image to 1048487 bites

          const MAX_WIDTH = 820
          const MAX_HEIGHT = 680
          const MIME_TYPE = 'image/jpeg'
          const QUALITY = 0.7
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
        } else {
          reader.readAsDataURL(file)
          reader.onloadend = () => {
            setPicture(reader.result)
            setPictureUpload(true)
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  //       const blobURL = window.URL.createObjectURL(file)
  //       const img = new Image()
  //       img.src = blobURL
  //       img.onerror = function () {
  //         URL.revokeObjectURL(this.src)
  //         // Handle the failure properly
  //         console.log('Cannot load image')
  //       }
  //       img.onload = function () {
  //         //@ts-ignore
  //         URL.revokeObjectURL(this.src)
  //         //@ts-ignore
  //         const [newWidth, newHeight] = calculateSize({
  //           img,
  //           MAX_WIDTH,
  //           MAX_HEIGHT,
  //         })
  //         const canvas = document.createElement('canvas')
  //         canvas.width = newWidth
  //         canvas.height = newHeight
  //         const ctx = canvas.getContext('2d')
  //         ctx?.drawImage(img, 0, 0, newWidth, newHeight)
  //         canvas.toBlob(
  //           (blob) => {
  //             // Handle the compressed image. es. upload or save in local state
  //             setDisplayInfoBefore(`Original file ${file}`)
  //             setDisplayInfoAfter(`Compressed file ${blob}`)
  //             setPicture(blob)
  //             setPictureUpload(true)
  //             alert('Image uploaded')
  //           },
  //           MIME_TYPE,
  //           QUALITY
  //         )
  //       }

  //       //   quality: 0.6,
  //       //   success(result) {
  //       //     setPicture(result)
  //       //     setPictureUpload(true)
  //       //   },
  //       //   error(err) {
  //       //     alert(err)
  //       //   },
  //       // })

  //       // const reader = new FileReader()
  //       // reader.readAsDataURL(image)
  //       // reader.onload = (readEvent) => {
  //       //   const img = new Image()
  //       //   img.src = readEvent!.target?.result as any
  //       //   img.onload = (loadEvent) => {
  //       //     const canvas = document.createElement('canvas')
  //       //     const ctx = canvas.getContext('2d')
  //       //     canvas.width = 1600
  //       //     canvas.height = 1600
  //       //     ctx?.drawImage(img, 0, 0, 1600, 1600)
  //       //     const dataUrl = canvas.toDataURL('image/jpeg')
  //       //     //format data url to blob
  //       //     const arr = dataUrl.split(',')
  //       //     const mime = arr[0].match(/:(.*?);/)![1]
  //       //     const bstr = atob(arr[1])
  //       //     let n = bstr.length
  //       //     const u8arr = new Uint8Array(n)
  //       //     while (n--) {
  //       //       u8arr[n] = bstr.charCodeAt(n)
  //       //     }
  //       //     const blob = new Blob([u8arr], { type: mime })
  //       //     //et blob to base64
  //       //     const reader = new FileReader()
  //       //     reader.readAsDataURL(blob)
  //       //     reader.onloadend = () => {
  //       //       const base64data = reader.result
  //       //       setPicture(base64data as any)
  //       //     }
  //       //   }
  //       // }

  //       alert(
  //         'image is too big, we are gonna try to reduce this photos size, finish filling out New Patient Packet and notify the front desk to make sure that the photo uploaded properly.'
  //       )
  //     } else {
  //       //upload the image at its original size
  //       reader.readAsDataURL(file)
  //       reader.onloadend = () => {
  //         setPicture(reader.result)
  //         setPictureUpload(true)
  //       }
  //     }
  //   }
  // } catch (e) {
  //   alert(e)
  // }

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
