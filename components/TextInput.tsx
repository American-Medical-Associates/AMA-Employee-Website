import React from 'react'
import classnames from 'classnames'
export default function TextInput({
  placeHolder,
  widthPercentage,
  onChange,
  type,
  value,
}: {
  placeHolder: string
  widthPercentage: string
  onChange: any
  type?: string
  value?: any
  //   text: string
}) {
  return (
    <div className=" my-5 flex w-full items-center justify-center ">
      <input
        value={value}
        type={type}
        placeholder={placeHolder}
        className={classnames(
          `${widthPercentage} cursor-pointer select-none rounded-[30px] border-2  bg-[#cacaca71] p-4 text-lg outline-none`
        )}
        onChange={onChange}
        // value={value}
      />
    </div>
  )
}
