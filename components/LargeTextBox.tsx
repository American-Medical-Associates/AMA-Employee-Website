import React from 'react'
import classnames from 'classnames'
function LargeTextBox({
  placeHolder,
  widthPercentage,
  onChange,
  heightPercentage,
  value,
  ref,
}: {
  placeHolder: string
  widthPercentage: string
  onChange: any
  heightPercentage: string
  value: any
  ref?: any
}) {
  return (
    <div
      className={classnames(
        `${heightPercentage} flex ${widthPercentage} my-2 w-full  items-start justify-start
          `
      )}
    >
      <textarea
        ref={ref}
        value={value}
        placeholder={placeHolder}
        className={classnames(
          ` h-full w-full flex-grow  rounded-[30px] border-2 bg-[#d6d6d671] p-4 text-lg  outline-none`
        )}
        onChange={onChange}
        // value={value}
      />
    </div>
  )
}
export default LargeTextBox
