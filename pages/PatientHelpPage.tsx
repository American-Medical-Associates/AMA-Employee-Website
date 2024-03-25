import React from 'react'

import YouTube from 'react-youtube'

export default function PatientHelpPage() {
  return (
    <div className=" ">
      <main className=" flex h-full w-full flex-col items-center justify-center ">
        <h1 className=" m-10 text-3xl text-blue-500">Help Page</h1>
        <div className=" flex w-full flex-col items-center justify-center">
          <p className="mx-10 md:mx-[300px] ">
            We are delighted to provide you with exceptional healthcare
            services. To help us better understand your medical history and
            health concerns, we request all new patients to fill out a New
            Patient Packet. To access the New Patient Packet, you must first
            create an account on our website. Creating an account is easy, and
            it only takes a few minutes. Simply click on the "Don't have an
            account? Register here." link on the Patient Login page, fill in
            your details, and you're all set. Once you have created an account,
            you will have access to the New Patient Packet. The New Patient
            Packet contains essential forms and questionnaires that help us
            understand your medical history, health concerns, and personal
            preferences. By filling out the New Patient Packet, you can ensure
            that our healthcare professionals provide you with the best possible
            care.
          </p>
          <h4 className=" m-10 text-red-600">
            IF YOU ARE HAVING TROUBLE AND THE PACKET IS NOT AUTO SAVING, PLEASE
            DO NOT FILL THE NEW PATIENT PACKET OUT MULTIPLE TIMES, COME IN AND
            FILL OUT IN OFFICE!
          </h4>
          <h2 className=" m-5 text-xl text-blue-500">How Create an account.</h2>

          <div className=" item-center flex w-full justify-center">
            <YouTube
              className=" flex w-full items-center justify-center"
              videoId="SwKLUii0Dl0"
            />
          </div>
          <h2 className="m-5 text-xl text-blue-500">
            How to sign in to your account.
          </h2>

          <div className="  item-center flex w-full justify-center">
            <YouTube
              className="flex w-full items-center justify-center"
              videoId="rJmjdY5WaoU"
            />
          </div>
          <h2 className="m-5 text-xl text-blue-500">
            How to fill out our New Patient Packet.
          </h2>

          <div className="  item-center flex w-full justify-center">
            <YouTube
              className=" flex  w-full items-center justify-center"
              videoId="hb0PtDYgWQY"
            />
          </div>
        </div>
      </main>
    </div>
  )
}
