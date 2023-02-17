import { NextPage } from 'next'
import React from 'react'
import Header from '../components/Header'

const Success: NextPage<{}> = () => {
  return (
    <div className=" flex h-full  w-full flex-col items-center justify-center">
      <Header selectCompany={'AMA'} />
      <div className=" flex h-[85vh] w-full items-center justify-center justify-self-center  ">
        <div className=" flex h-[40%] w-[60%] flex-col items-center justify-center rounded-[20px] bg-[#c5c5c576] shadow-2xl">
          <h1 className=" text-3xl text-[#377adf]"> Success!</h1>
          <h2 className="mt-5 text-xl">
            Thank you for submitting! We will get back to you as soon as
            possible!
          </h2>
        </div>
      </div>
    </div>
  )
}
export default Success
