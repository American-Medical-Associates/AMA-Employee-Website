import React from 'react'

export const TimeSelector: React.FC<{ setTime: Function; time: string }> = ({
  setTime,
  time,
}) => {
  //change the dropdown in input to black
  return (
    <div className=" my-5 flex items-center justify-center">
      <input
        //style the ::after bg to be black

        className=" select-none   rounded-[25px] bg-[#cacaca71] p-5 after:bg-black  focus:outline-none"
        type={'time'}
        onChange={(time: any) => {
          setTime(time.target.value)
        }}
        value={time}
      />
    </div>
  )
}
