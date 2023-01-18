import React from 'react'
import classnames from 'classnames'
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline'
export const RoundAddButton: React.FC<{
  typeOfButton?: string
  onClick: any
  PlusOrMinus: string
  disabled?: boolean
  color?: string
}> = ({ onClick, PlusOrMinus, disabled, typeOfButton, color }) => {
  return (
    <button
      type={typeOfButton as 'submit'}
      disabled={disabled}
      onClick={onClick}
      className={`hover: my-5 flex h-[60px] w-[60px] items-center justify-center rounded-full ${
        color ? color : 'bg-[#0008ff]'
      } font-bold text-[#ffffff] shadow-md transition duration-150 hover:scale-[110%] hover:shadow-lg active:scale-90`}
    >
      {PlusOrMinus == 'plus' && (
        <PlusIcon className=" h-12 w-10   cursor-pointer  duration-[500s] ease-in" />
      )}
      {PlusOrMinus == 'minus' && (
        <MinusIcon className=" h-12 w-10   cursor-pointer  duration-[500s] ease-in" />
      )}
    </button>
  )
}
