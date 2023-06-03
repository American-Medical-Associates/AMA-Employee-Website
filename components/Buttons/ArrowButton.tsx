import React, { MouseEventHandler } from 'react'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

const ArrowButton: React.FC<{ direction: any; onClick: MouseEventHandler }> = ({
  direction,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-200"
    >
      {direction === 'left' ? (
        <ArrowLeftIcon className="h-5 w-5 text-gray-500" />
      ) : (
        <ArrowRightIcon className="h-5 w-5 text-gray-500" />
      )}
    </button>
  )
}
export default ArrowButton
