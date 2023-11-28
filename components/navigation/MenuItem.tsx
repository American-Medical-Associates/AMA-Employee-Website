import React from 'react'

export const MenuItem: React.FC<{ onClick: any; text: string; icon?: any; isDropdownItem?: boolean; }> = ({
  text,
  icon,
  onClick,
  isDropdownItem = false
}) => {
  const itemClass = isDropdownItem 
  ? "m-1 flex w-full cursor-pointer items-center justify-start rounded-md bg-white p-2 shadow transition duration-200 ease-in-out hover:bg-blue-500 hover:text-white"
  : "m-2 flex w-full cursor-pointer items-center justify-start rounded-lg bg-white p-4 shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-600 hover:text-white md:m-3 md:p-5";
  return (
    <li
      onClick={onClick}
      className={itemClass}
    >
      {icon != null ? (
        <div className="flex w-full items-center">
          <div className="flex-shrink-0 ml-3">{icon}</div>
          <h1 className={isDropdownItem ? "ml-2 text-sm" : "ml-4 text-base font-medium md:text-lg"}>{text}</h1>
        </div>
      ) : (
        <h1 className={isDropdownItem ? "text-sm" : "text-base font-medium md:text-lg"}>{text}</h1>
      )}
    </li>
  )
}
