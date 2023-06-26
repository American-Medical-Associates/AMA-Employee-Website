import React from 'react'

export const LoadingSpinner: React.FC<{
  loadingText?: string
  hight: string
  width: string
  lineWidth: string
}> = ({ loadingText, hight, width, lineWidth }) => {
  return (
    <div className="my-5 flex h-[20%] w-full flex-col items-center justify-center">
      <div className="flex items-center justify-center">
        <div
          className={`${hight} ${width} animate-spin rounded-full ${lineWidth} border-[#2e65ff]`}
        ></div>
      </div>
      <h2 className="mt-10 text-[#2e65ff]">{loadingText}</h2>
    </div>
  )
}
