"use client"

import React, { useEffect } from 'react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useCreatorSummary } from 'src/context/creatorDashboard/useCreatorSummary'
import { TimeSeriesDataPoint } from 'src/interfaces/datas/common'
import { UserActivity } from 'src/interfaces/datas/user'

interface props {
  date: string;
  amount: number;
}
interface ProjectViewerProps {
  data?: TimeSeriesDataPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-orange-500 text-white p-2 rounded shadow-lg">
        <p className="font-bold">{`Day ${label}`}</p>
        <p>{`Viewer: ${payload[0].value}`}</p>
      </div>
    )
  }
  return null
}

// Helper function to calculate day differences from the first date
const calculateDaysFromFirstDate = (data: TimeSeriesDataPoint[]): TimeSeriesDataPoint[] => {
  if (!data || data.length === 0) return [];
  
  const firstDate = new Date(data[0].date); // Assuming 'date' is in ISO format
  return data.map((item, index) => {
    const currentDate = new Date(item.date);
    const timeDiff = currentDate.getTime() - firstDate.getTime();
    const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24)) + 1; // Day 1 for the first date

    return {
      ...item,
      day: dayDiff
    };
  });
};



// Mock data
const mockData: TimeSeriesDataPoint[] = [
  { date: "2024-09-11T16:21:29.138Z", totalAmount: 15, transactionCount:1},
  { date: "2024-09-12T16:21:29.138Z", totalAmount: 25, transactionCount:2},
  { date: "2024-09-13T16:21:29.138Z", totalAmount: 40, transactionCount:3},
  { date: "2024-09-14T16:21:29.138Z", totalAmount: 45, transactionCount:4},
]



export default function DashBoard({ data = mockData }: ProjectViewerProps) {
  const processedData = calculateDaysFromFirstDate(data);

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-extrabold text-gray-700">Project Viewer</h2>
      </div>
      <div className="h-[400px]">
        {processedData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={processedData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff7043" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ff7043" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="day"
                axisLine={true}
                tickLine={false}
                tick={{ fill: '#888', fontSize: 12 }}
                domain={['dataMin', 'dataMax']}
              />
              <YAxis
                axisLine={true}
                tickLine={true}
                tick={{ fill: '#888', fontSize: 12 }}
                domain={[0, 'dataMax + 10']}
              />
              <Tooltip content={<CustomTooltip />} cursor={true} position={{ y: 0 }} />
              <Area
                type="natural"
                dataKey="totalAmount"
                stroke="#ff7043"
                fillOpacity={1}
                fill="url(#colorValue)"
                connectNulls
                activeDot={{
                  r: 6,
                  fill: "#ff7043",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <p>No data available</p> // Fallback when there's no data
        )}
      </div>
    </div>
  );
}
