import classnames from 'classnames'
import React from 'react'

function MainButton({
  onClick,
  buttonText,
  buttonWidth,
  disabled,
  typeOfButton,
}: {
  typeOfButton?: string
  onClick: any
  buttonText: string
  buttonWidth?: string
  disabled?: boolean
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
