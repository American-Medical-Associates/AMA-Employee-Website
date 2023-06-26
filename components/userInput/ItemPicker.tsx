import React from 'react'

function ItemPicker({
  options,
  onChange,
  value,
}: {
  value: any
  options: any
  onChange: any
}) {
  return (
    <select
      placeholder="Please select"
      onChange={onChange}
      value={value}
      className=" w-[60%]  rounded-[20px] border-2 bg-[#cacaca71] p-4 px-2 text-center text-lg text-[#9f9f9f] outline-none"
    >
      {options}
      {/* <option value="grapefruit">Grapefruit</option>
      <option value="lime">Lime</option>
      <option selected value="coconut">
        Coconut
      </option>
      <option value="mango">Mango</option> */}
    </select>
  )
}
export default ItemPicker
