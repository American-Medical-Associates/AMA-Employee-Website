import React from 'react'

export const MenuItem: React.FC<{ onClick: any; text: string; icon?: any }> = ({
  text,
  icon,
  onClick,
}) => {
  return (
    <li
      onClick={onClick}
      className=" m-[2px] my-[4px] flex w-full cursor-pointer items-center justify-start rounded-[20px] bg-[#ffffffd8] p-[5px] shadow-2xl  duration-500 hover:scale-110  hover:bg-[#0008ff] hover:text-white"
    >
      {icon != null ? (
        <div className=" flex w-full ">
          <div className=" ml-5 mr-5 w-[full] justify-self-start ">{icon}</div>
          <h1 className=" ml-2 self-center justify-self-center text-lg">
            {text}
          </h1>
        </div>
      ) : (
        <div className=" flex w-full items-center justify-center ">
          <h1 className=" self-center justify-self-center text-lg">{text}</h1>
        </div>
      )}
    </li>
  )
}
