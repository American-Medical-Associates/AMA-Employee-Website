import React from 'react'

const SectionWithTitle: React.FC<{
  title?: string
  children: Array<any>
  BgColor?: string
  subTitle?: string
}> = ({ title, children, subTitle, BgColor }) => {
  return (
    <section className=" mt-20 flex flex-col items-center justify-center ">
      <div
        className={` flex w-[60%] flex-col items-center justify-center rounded-[30px] py-10 px-5 ${BgColor}`}
      >
        <h3 className=" text-center text-3xl font-bold text-[#616161]">
          {title}
        </h3>

        <p className=" text-center text-lg">{subTitle}</p>
        <div className=" flex h-full w-full flex-col items-start justify-start py-5">
          {children}
        </div>
      </div>
    </section>
  )
}
export default SectionWithTitle
