import React from 'react'
import classnames from 'classnames'

const LineDivider: React.FC<{
  lineWidth: string
  lineHight: string
  lineColor: string
  margin?: string
}> = ({ lineWidth, lineHight, margin, lineColor }) => {
  return (
    <div
      className={classnames(
        ` rounded-[30px] ${lineWidth} ${margin} ${lineHight} ${lineColor}`
      )}
    ></div>
  )
}
export default LineDivider
