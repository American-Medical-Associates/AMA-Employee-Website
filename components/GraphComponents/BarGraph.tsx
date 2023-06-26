import React, { useState } from 'react'
//@ts-ignore
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Bar } from 'recharts'

import Segment from './segment'

const BarGraph: React.FC<{
  data: any
  setDay?: any
  setWeek?: any
  setMonth?: any
  setYear?: any
  setAll?: any
  day: boolean
  week: boolean
  month: boolean
  year: boolean
  all: boolean
  curentTimeFrame: any
  toolTipText: string
  totalForTimeFrame: number
}> = ({
  data,
  setDay,
  setWeek,
  setMonth,
  setYear,
  setAll,
  day,
  week,
  month,
  year,
  all,
  curentTimeFrame,
  totalForTimeFrame,
  toolTipText,
}) => {
  return (
    <div>
      <div className="flex flex-row items-center justify-center">
        {data && (
          <BarChart
            width={900}
            height={500}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey={toolTipText} fill="#8884d8" />
          </BarChart>
        )}
        <div>
          <h6>
            <span className="text-blue-500">{curentTimeFrame}</span> Total:
            <span className="text-blue-500">{totalForTimeFrame}</span>
          </h6>
        </div>
      </div>
      <div>
        <Segment
          numberOfOptionsMax5={3}
          textOptionOne="Day"
          textOptionTwo="Month"
          textOptionThree="All"
          setOptionOne={setDay}
          setOptionTwo={setMonth}
          setOptionThree={setAll}
          optionOne={day}
          optionTwo={month}
          optionThree={all}
        />
      </div>
    </div>
  )
}
export default BarGraph
