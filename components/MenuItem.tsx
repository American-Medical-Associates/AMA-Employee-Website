import React from 'react'

export const MenuItem: React.FC<{ onClick: any; text: string; icon: any }> = ({
  text,
  icon,
  onClick,
}) => {
  return (
    <li
      onClick={onClick}
      className=" m-[2px] my-[4px] flex w-full  cursor-pointer items-center  justify-start rounded-[20px] bg-[#ffffffd8] p-[5px] shadow-2xl hover:bg-[#7c3af5be] hover:text-white"
    >
      <div className=" flex w-full ">
        <div className=" ml-5 mr-5 w-[full] justify-self-start ">{icon}</div>
        <h1 className=" ml-2 self-center justify-self-center text-lg">
          {text}
        </h1>
      </div>
    </li>
  )
}
