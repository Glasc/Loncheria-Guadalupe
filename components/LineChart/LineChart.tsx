import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { faker } from '@faker-js/faker'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
}

interface LineChartProps {
  labels: string[]
  dataSetLabel: number[]
}

export function LineChart({ labels, dataSetLabel }: LineChartProps) {
 const data = {
    labels,
    datasets: [
      {
        label: 'Ventas',
        data: dataSetLabel,
        borderColor: '#E94A30',
        backgroundColor: '#E94A30',
      },
    ],
  }

  return <Line options={options} data={data} />
}
