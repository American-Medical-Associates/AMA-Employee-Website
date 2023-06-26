import React, { useState } from 'react'

const Segment: React.FC<{
  setOptionOne: any
  setOptionTwo?: any
  setOptionThree?: any
  setOptionFour?: any
  setOptionFive?: any

  optionOne: boolean
  optionTwo?: boolean
  optionThree?: boolean
  optionFour?: boolean
  optionFive?: boolean

  textOptionOne: string
  textOptionTwo?: string
  textOptionThree?: string
  textOptionFour?: string
  textOptionFive?: string

  numberOfOptionsMax5: number
}> = ({
  setOptionOne,
  setOptionTwo,
  setOptionThree,
  setOptionFour,
  setOptionFive,

  optionOne,
  optionTwo,
  optionThree,
  optionFour,
  optionFive,

  textOptionOne,
  textOptionTwo,
  textOptionThree,
  textOptionFour,
  textOptionFive,
  numberOfOptionsMax5,
}) => {
  return (
    <div className=" flex flex-row items-center justify-center">
      <div
        onClick={() => {
          setOptionOne(true)
          if (setOptionTwo) {
            setOptionTwo(false)
          }
          if (setOptionThree) {
            setOptionThree(false)
          }
          if (setOptionFour) {
            setOptionFour(false)
          }
          if (setOptionFive) {
            setOptionFive(false)
          }
        }}
        //optionOne is true then set the color to blue
        className={`${
          optionOne ? 'bg-blue-500' : 'bg-gray-300'
        }  m-[5px] my-[4px] flex cursor-pointer flex-row items-center justify-center rounded-[20px]  p-[10px] px-5  text-center shadow-xl  duration-500  hover:scale-[110%] hover:bg-blue-500`}
        //className=" m-[5px] my-[4px] flex w-full  cursor-pointer items-center  justify-start rounded-[20px] bg-[#ffffffd8] p-[5px] shadow-2xl hover:bg-[#0008ff]  hover:text-white"
      >
        <h1 className=" self-center justify-self-center text-center text-lg">
          {textOptionOne}
        </h1>
      </div>
      {numberOfOptionsMax5 > 1 && (
        <div
          onClick={() => {
            setOptionOne(false)
            if (setOptionTwo) {
              setOptionTwo(true)
            }
            if (setOptionThree) {
              setOptionThree(false)
            }
            if (setOptionFour) {
              setOptionFour(false)
            }
            if (setOptionFive) {
              setOptionFive(false)
            }
          }}
          className={`${
            optionTwo ? 'bg-blue-500' : 'bg-gray-300'
          }  m-[5px] my-[4px] flex cursor-pointer flex-row items-center justify-center rounded-[20px]  p-[10px] px-5  text-center shadow-xl  duration-500 hover:scale-[110%] hover:bg-blue-500`}
        >
          <h1 className="  self-center justify-self-center text-lg">
            {textOptionTwo}
          </h1>
        </div>
      )}
      {numberOfOptionsMax5 > 2 && (
        <div
          onClick={() => {
            setOptionOne(false)
            if (setOptionTwo) {
              setOptionTwo(false)
            }
            if (setOptionThree) {
              setOptionThree(true)
            }
            if (setOptionFour) {
              setOptionFour(false)
            }
            if (setOptionFive) {
              setOptionFive(false)
            }
          }}
          className={`${
            optionThree ? 'bg-blue-500' : 'bg-gray-300'
          }  m-[5px] my-[4px] flex cursor-pointer flex-row items-center justify-center rounded-[20px]  p-[10px] px-5  text-center shadow-xl  duration-500 hover:scale-[110%] hover:bg-blue-500`}
        >
          <h1 className=" self-center justify-self-center text-lg">
            {textOptionThree}
          </h1>
        </div>
      )}
      {numberOfOptionsMax5 > 3 && (
        <div
          onClick={() => {
            setOptionOne(false)
            if (setOptionTwo) {
              setOptionTwo(false)
            }
            if (setOptionThree) {
              setOptionThree(false)
            }
            if (setOptionFour) {
              setOptionFour(true)
            }
            if (setOptionFive) {
              setOptionFive(false)
            }
          }}
          className={`${
            optionFour ? 'bg-blue-500' : 'bg-gray-300'
          }  m-[5px] my-[4px] flex cursor-pointer flex-row items-center justify-center rounded-[20px]  p-[10px] px-5  text-center shadow-xl  duration-500 hover:scale-[110%] hover:bg-blue-500`}
        >
          <h1 className="  self-center justify-self-center text-lg">
            {textOptionFour}
          </h1>
        </div>
      )}
      {numberOfOptionsMax5 > 4 && (
        <div
          onClick={() => {
            setOptionOne(false)
            if (setOptionTwo) {
              setOptionTwo(false)
            }
            if (setOptionThree) {
              setOptionThree(false)
            }
            if (setOptionFour) {
              setOptionFour(false)
            }
            if (setOptionFive) {
              setOptionFive(true)
            }
          }}
          className={`${
            optionFive ? 'bg-blue-500' : 'bg-gray-300'
          }  m-[5px] my-[4px] flex cursor-pointer flex-row items-center justify-center rounded-[20px]  p-[10px] px-5  text-center shadow-xl  duration-500 hover:scale-[110%] hover:bg-blue-500`}
        >
          <h1 className="  self-center justify-self-center text-lg">
            {textOptionFive}
          </h1>
        </div>
      )}
    </div>
  )
}
export default Segment
