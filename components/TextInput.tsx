import React from 'react'
import classnames from 'classnames'
export default function TextInput({
  placeHolder,
  widthPercentage,
  onChange,
  type,
  value,
  ref,
  id,
  missing,
  required,
}: {
  placeHolder: string
  widthPercentage?: string
  onChange: any
  type?: string
  value?: any
  ref?: any
  id?: string
  missing?: boolean
  required?: boolean
  //   text: string
}) {
  if (required) {
    if (value === '') {
      missing = true
    } else {
      missing = false
    }
  }

  return (
    <div id={id} className=" my-5 flex w-full items-center justify-center ">
      <input
        ref={ref}
        value={value}
        type={type}
        placeholder={placeHolder}
        className={classnames(
          `${widthPercentage} cursor-pointer  rounded-[30px] border-2 ${
            missing ? 'bg-[#ff1818]' : 'bg-[#cacaca71]'
          }   p-4 text-lg outline-none`
        )}
        onChange={onChange}
        // value={value}
      ></input>
    </div>
  )
}
