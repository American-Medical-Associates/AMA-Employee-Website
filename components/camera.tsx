import React, { useState } from 'react'
import MainButton from './MainButton'

const Camera: React.FC<{ picture: any; setPicture: any }> = ({
  picture,
  setPicture,
}) => {
  // this is a camera component to take pictures of the patient

  //1.create a camera component
  //2. take a picture
  //3. save the picture to the database
  //4. display the picture on the screen
  //5. allow the user to take another picture
  //6. allow the user to delete the picture
  //7. allow the user to upload a picture from their computer
  //8. allow the user to delete the picture from their computer

  const [showCamera, setShowCamera] = useState(false)

  const camera = () => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      const video = document.querySelector('video')
      video!.srcObject = stream
      video!.play()
    })
  }

  const takePicture = () => {
    const canvas = document.querySelector('canvas')
    const video = document.querySelector('video')
    const context = canvas!.getContext('2d')
    context!.drawImage(video!, 0, 0, 640, 480)
    const data = canvas!.toDataURL('image/png')
    setPicture(data)
  }
  const deletePicture = async () => {
    setPicture('')
    //stop the camera

    const video = document.querySelector('video')
    const stream = video!.srcObject
    // @ts-ignore
    const tracks = await stream!.getTracks()
    tracks.forEach(async (track: any) => {
      await track.stop()
    })
    //clear the canvas
    const canvas = document.querySelector('canvas')
    const context = canvas!.getContext('2d')
    context!.clearRect(0, 0, canvas!.width, canvas!.height)
    //clear the video

    video!.srcObject = null
    //hide the camera
    setShowCamera(false)

    // video!.srcObject = null
    // video!.pause()
  }

  return (
    <div className="flex flex-col  items-center">
      <MainButton
        buttonText="open camera"
        onClick={() => {
          if (!showCamera) {
            camera()
          }
          setShowCamera(!showCamera)
        }}
      />
      {showCamera && (
        <div className=" flex flex-col items-center justify-center">
          <video className=" rounded-[30px]"></video>

          <MainButton
            buttonText="take picture"
            onClick={() => {
              takePicture()
            }}
          />
          <canvas className=" rounded-[30px]" width="640" height="480"></canvas>
          {picture && (
            <MainButton
              buttonText="delete picture"
              onClick={() => deletePicture()}
            />
          )}
        </div>
      )}
    </div>
  )
}
export default Camera
