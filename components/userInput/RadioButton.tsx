import React, { useState } from 'react'

const RadioButton: React.FC<{ answer?: string; answerState: any }> = ({
  answer,
  answerState,
}) => {
  //   const [answer, setAnswer] = useState(null)
  const [checked1, setChecked1] = useState(false)
  const [checked2, setChecked2] = useState(false)
  return (
    <div className=" flex w-full grid-cols-2 content-center items-center  justify-center  text-center">
      <div className=" flex w-[50%] items-center justify-end self-center pr-4 text-center text-lg  text-[#484848d6]">
        {/* <label className=" mx-3 flex justify-center text-center"> */}
        <input
          required
          className=" border-10  inline-block h-6 w-6 rounded-full"
          value="No"
          type={'radio'}
          checked={checked1}
          onChange={(answer: any) => {
            answerState(answer.target.value)
            if (checked1 == true) {
              setChecked1(false)
            } else {
              setChecked1(true)
            }
            if (checked2 == true) {
              setChecked2(false)
            }
          }}
        />
        No
      </div>
      {/* </label> */}
      <div className=" flex w-[50%] items-center justify-start pl-4 text-center text-lg text-[#484848d6]">
        <input
          className="  border-10   inline-block h-6 w-6 rounded-full"
          onChange={(answer: any) => {
            answerState(answer.target.value)

            if (checked2 == true) {
              setChecked2(false)
            } else {
              setChecked2(true)
            }
            if (checked1 == true) {
              setChecked1(false)
            }
          }}
          checked={checked2}
          value={'Yes'}
          type={'radio'}
        ></input>
        Yes
      </div>
    </div>
  )
}
export default RadioButton
