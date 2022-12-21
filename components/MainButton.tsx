import classnames from 'classnames'
import React from 'react'

function MainButton({
  onClick,
  buttonText,
  buttonWidth,
  disabled,
  typeOfButton,
  loading,
}: {
  typeOfButton?: string
  onClick: any
  buttonText: string
  buttonWidth?: string
  disabled?: boolean
  loading?: boolean
}) {
  if (disabled) {
    return (
      <button
        type={typeOfButton as 'submit'}
        disabled={disabled}
        onClick={onClick}
        className={classnames(
          ` ${buttonWidth} hover: my-3 rounded-full  bg-[#6d6d6d] px-9 py-4 font-bold text-[#ffffff] shadow-md transition duration-150 hover:scale-[110%] hover:shadow-lg active:scale-90  `
        )}
      >
        {buttonText}
      </button>
    )
  } else {
    if (loading) {
      return (
        <button
          type={typeOfButton as 'submit'}
          disabled={true}
          onClick={onClick}
          className={classnames(
            ` ${buttonWidth} hover: my-3 rounded-full  bg-[#0008ff] px-9 py-4 font-bold text-[#ffffff] shadow-md transition duration-150 hover:scale-[110%] hover:shadow-lg active:scale-90  `
          )}
        >
          <div className="flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-white"></div>
          </div>
        </button>
      )
    }
    return (
      <button
        type={typeOfButton as 'submit'}
        disabled={disabled}
        onClick={onClick}
        className={classnames(
          ` ${buttonWidth} hover: my-3 rounded-full  bg-[#0008ff] px-9 py-4 font-bold text-[#ffffff] shadow-md transition duration-150 hover:scale-[110%] hover:shadow-lg active:scale-90  `
        )}
      >
        {buttonText}
      </button>
    )
  }
}

export default MainButton
