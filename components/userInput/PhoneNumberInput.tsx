import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import { text } from 'stream/consumers'
const PhoneNumberInput: React.FC<{
  placeHolder: string
  widthPercentage?: string
  onChange: any
  id?: string
  value?: string | undefined
  ref?: any
  valueState?: any
  missing?: boolean
  required?: boolean
}> = ({
  placeHolder,
  widthPercentage,
  onChange,
  value,
  id,
  ref,
  required,
  missing,
}) => {
  const [valueState, setValueState] = useState(value)
  const useFormat: boolean = true
  useEffect(() => {
    const formatCode: any = () => {
      const cleaned = value?.replace(/\D/g, '')
      const match = cleaned?.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
      if (useFormat && match) {
        const intlCode = match[1] ? '+1 ' : ''

        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
      }

      return cleaned ?? null
    }

    setValueState(formatCode())
  }, [value, valueState])

  if (required) {
    if (value === '') {
      missing = true
    } else {
      missing = false
    }
  }

  return (
    <div className=" my-5 flex w-full items-center justify-center ">
      <input
        id={id}
        ref={ref}
        maxLength={10}
        value={valueState}
        type={'tel'}
        placeholder={placeHolder}
        className={classnames(
          `${missing ? 'bg-[#ff1818]' : 'bg-[#cacaca71]'}
          
          ${widthPercentage} cursor-pointer  rounded-[30px] border-2   p-4 text-lg outline-none`,
        )}
        onChange={onChange}
      />
    </div>
  )
}
export default PhoneNumberInput
