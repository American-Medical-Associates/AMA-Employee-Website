import React, { useEffect, useRef, useState } from 'react'
import { Fragment } from 'react'
import { MenuItem } from './MenuItem'
import { Bars3Icon } from '@heroicons/react/24/outline'

const DropDownMenu: React.FC<{
  item: Array<any>;
  setOpenMenu: any;
  openMenu: any;
}> = ({ item, setOpenMenu, openMenu }) => {
  return (
    <div>
      <div className="flex w-full justify-end">
        <Bars3Icon
          onClick={() => setOpenMenu(!openMenu)}
          className="h-10 w-5 cursor-pointer text-black duration-500 ease-in"
        />
      </div>
      <div className="absolute right-0 mt-6 max-h-100 pr-4 w-auto min-w-[200px] max-w-[90vw] overflow-x-hidden overflow-y-auto flex-col items-start rounded-lg bg-gray-200 p-2 shadow-xl">
        {item}
      </div>
    </div>
  )
}
export default DropDownMenu


