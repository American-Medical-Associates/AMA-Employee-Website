import React from 'react'
import classnames from 'classnames'

const LineDivider: React.FC<{
  lineWidth: string
  lineHeight: string
  lineColor: string
  margin?: string
}> = ({ lineWidth, lineHeight, margin, lineColor }) => {
  return (
    <div
      className={classnames(
        ` rounded-[30px] ${lineWidth} ${margin} ${lineHeight} ${lineColor}`
      )}
    ></div>
  )
}
export default LineDivider
