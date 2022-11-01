import React from 'react'

export const CircularButton: React.FC<{
  onClick: any

  icon?: any
}> = ({ icon, onClick }) => {
  return (
    <li
      onClick={onClick}
      className=" mx-[2px] my-[2px] flex  h-[50px] w-[50px]  cursor-pointer items-center  justify-start rounded-[300px] bg-[#e3e3e3c5] p-[6px] shadow-2xl  hover:scale-[1.2] hover:bg-[#eeeeee] hover:duration-500 hover:ease-in-out"
    >
      <div className=" flex w-full items-center justify-center ">
        <div className="  w-[full] justify-self-start ">{icon}</div>
      </div>
    </li>
  )
}
