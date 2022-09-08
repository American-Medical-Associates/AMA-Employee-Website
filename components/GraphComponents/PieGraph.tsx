import React, { useState } from 'react'
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import { selectDate } from '../../redux/slices/companySlice'
import Datepicker from '../Datepicker'
import Segment from './segment'

const PieGraph: React.FC<{
  data: any
  setDay: any
  setWeek: any
  setMonth: any
  setYear: any
  setAll: any
  day: boolean
  week: boolean
  month: boolean
  year: boolean
  all: boolean
  curentTimeFrame: any
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
}) => {
  return (
    <div>
      <div className="flex flex-row items-center justify-center">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="ma"
            isAnimationActive={true}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />

          <Tooltip />
        </PieChart>
        <div>
          <h6>
            <span className="text-blue-500">{curentTimeFrame}</span> Total:
            <span className="text-blue-500">{totalForTimeFrame}</span>
          </h6>
        </div>
      </div>
      <div>
        {/* <Segment
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
        /> */}
      </div>
    </div>
  )
}
export default PieGraph
