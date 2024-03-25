import React from 'react'
import classnames from 'classnames'
const SearchComponent: React.FC<{
  value: any
  type?: string
  placeHolder: string
  widthPercentage?: string
  onChange: any
}> = ({ onChange, value, placeHolder, widthPercentage }) => {
  return (
    <div>
      <input
        value={value}
        type={'search'}
        placeholder={placeHolder}
        className={classnames(
          `${widthPercentage} cursor-pointer  rounded-[30px] border-2  bg-[#cacaca71] p-2 text-lg outline-none`,
        )}
        onChange={onChange}
        // value={value}
      />
    </div>
  )
}
export default SearchComponent
