import React from 'react'

const GreenCheckMark: React.FC<{
  bottomText?: string
  checkMarkText: string
}> = ({ bottomText, checkMarkText }) => {
  return (
    <div>
      <div className=" mt-10 flex items-center justify-center">
        {/* make gree check mark with tailwind */}
        <div className=" flex items-center justify-center duration-500 hover:scale-[110%]">
          <div className=" first-letter: flex h-[60px] w-[60px] items-center justify-center rounded-[15px] bg-[#f9f9f9]  shadow-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#13f007"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div className=" ml-2 text-2xl font-bold text-green-500">
            {checkMarkText}
          </div>
        </div>
      </div>
      <div className=" mt-10 flex items-center justify-center">
        <div className=" text-xl font-bold text-green-500">{bottomText}</div>
      </div>
    </div>
  )
}
export default GreenCheckMark
