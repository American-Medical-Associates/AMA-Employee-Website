import React from 'react'
import classnames from 'classnames'
export default function TextInput({
  placeHolder,
  widthPercentage,
  onChange,
  type,
  value,
  ref,
}: {
  placeHolder: string
  widthPercentage?: string
  onChange: any
  type?: string
  value?: any
  ref?: any
  //   text: string
}) {
  return (
    <div className=" my-5 flex w-full items-center justify-center ">
      <input
        ref={ref}
        value={value}
        type={type}
        placeholder={placeHolder}
        className={classnames(
          `${widthPercentage} cursor-pointer  rounded-[30px] border-2  bg-[#cacaca71] p-4 text-lg outline-none`
        )}
        onChange={onChange}
        // value={value}
      />
    </div>
  )
}
