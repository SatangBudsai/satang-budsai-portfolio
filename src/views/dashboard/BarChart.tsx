import React, { Fragment } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
  TooltipProps
} from 'recharts'
import { Payload } from 'recharts/types/component/DefaultTooltipContent'

// Sample data
const data = [
  { name: 'ม.ค.', use: 4000, activity: 200 },
  { name: 'ม.ค.', use: 4000, activity: 122 },
  { name: 'ก.พ.', use: 3000, activity: 234 },
  { name: 'มี.ค.', use: 2000, activity: 533 },
  { name: 'เม.ย.', use: 2780, activity: 645 },
  { name: 'พ.ค.', use: 1890, activity: 765 },
  { name: 'มิ.ย.', use: 2390, activity: 234 },
  { name: 'ก.ค.', use: 3490, activity: 874 },
  { name: 'ส.ค.', use: 2000, activity: 456 },
  { name: 'ก.ย.', use: 2780, activity: 668 },
  { name: 'ต.ค.', use: 1890, activity: 762 },
  { name: 'พ.ย.', use: 2390, activity: 234 },
  { name: 'ธ.ค.', use: 3490, activity: 555 }
]

type Props = {}

const translation = {
  use: 'ตันคาร์บอนไดออกไซต์เทียบเท่า',
  activity: 'หน่วยงาน'
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className='rounded-xl border border-gray-300 bg-white p-2'>
        <p className='text-gray-700'>{label}</p>
        {payload.map((item: Payload<number, string>, index: number) => (
          <div key={index} className='flex items-center gap-2'>
            <div className='h-2 w-2 rounded-full' style={{ backgroundColor: item.color }} />
            <p className='text-gray-600'>{`${translation[item.name as keyof typeof translation] || item.name} : ${item.value}`}</p>
          </div>
        ))}
      </div>
    )
  }

  return null
}
const CustomLegend = (props: any) => {
  const { payload } = props

  return (
    <div className='flex justify-center'>
      {payload.map((entry: any, index: number) => (
        <div key={`item-${index}`} className='mr-2 flex items-center'>
          <div style={{ backgroundColor: entry.color, marginRight: 5 }} className='h-4 w-6 rounded-lg' />
          {translation[entry.value as keyof typeof translation] || entry.value}
        </div>
      ))}
    </div>
  )
}

const ColumnChart = (props: Props) => {
  return (
    <Fragment>
      <ResponsiveContainer width='100%' height={400}>
        <BarChart data={data} margin={{ top: 18 }}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip content={CustomTooltip} />
          <Legend content={<CustomLegend />} />

          <Bar dataKey='use' fill='#686869' radius={[6, 6, 0, 0]}>
            <LabelList dataKey='use' position='top' className='text-xs' />
          </Bar>
          <Bar dataKey='activity' fill='#0088FE' radius={[6, 6, 0, 0]}>
            <LabelList dataKey='activity' position='top' className='text-xs' />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Fragment>
  )
}

export default ColumnChart
