import React, { useEffect, useRef, useState } from 'react'
import { Fragment } from 'react'
import { MenuItem } from './MenuItem'

const DropDownMenu: React.FC<{
  // focus: boolean
  item: Array<any>
  // props: any
  // setOpen: any
  // open: boolean
}> = ({
  item,
  // focus, props, setOpen, open
}) => {
  const ref = useRef(null)
  //const [open, setOpen] = useState(false)
  // useEffect(() => {
  //   const handleClickOutside = (event: any) => {
  //     if (ref.current && !ref.current.contains(event.target)) {
  //       setOpen(!open)
  //     }
  //   }
  //   document.addEventListener('click', handleClickOutside, true)
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside, true)
  //   }
  // }, [open])
  return (
    <div
      ref={ref}
      className=" relative mt-[25px] flex w-[200px] translate-x-[-105%] flex-col items-start overflow-hidden rounded-[20px] bg-[#edededf9] p-2  shadow-2xl duration-[500s] ease-in"
    >
      {item}
    </div>
  )
}
export default DropDownMenu
