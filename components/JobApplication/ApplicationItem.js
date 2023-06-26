import Image from 'next/image'
import React from 'react'

const ApplicationItem = ({ name, Item }) => {
  return (
    <div className=" mx-10 my-4 w-full">
      <h3 className=" text-xl text-[#363636f4]">{name}</h3>
      <p className=" text-lg text-[#3d3d3dbc]">{Item}</p>
    </div>
  )
}
export default ApplicationItem
