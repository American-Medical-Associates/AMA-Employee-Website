import React from 'react'

export const CircularButton: React.FC<{
  onClick: any
  isSelection?: boolean
  icon?: any
  deletion?: boolean
}> = ({ icon, onClick, isSelection, deletion }) => {
  //random key
  const randomKey = Math.random().toString(36).substring(7)

  return (
    <button
      key={randomKey}
      // id={`button${randomKey}`}
      onClick={onClick}
      className={`  my-[2px] flex  h-[50px] w-[50px]  cursor-pointer items-center  justify-start rounded-[300px] ${
        isSelection ? 'bg-[#4b87fd]' : 'bg-[#e3e3e3c5]'
      } mx-[2px] ${
        deletion ? 'bg-[#ff1e1e]' : null
      } p-[6px] shadow-2xl  hover:scale-[1.2] ${
        isSelection ? 'hover:bg-[#87afff]' : 'hover:bg-[#eeeeee]'
      } ${deletion ? 'hover:bg-[#ff8787]' : null}
       hover:duration-500 hover:ease-in-out`}
    >
      <div className=" flex w-full items-center justify-center ">
        <div className="  w-[full] justify-self-start ">{icon}</div>
      </div>
    </button>
  )
}
