import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
}

interface BarChartProps {
  labels: string[]
  dataSetLabel: number[]
}

export function BarChart({ labels, dataSetLabel }: BarChartProps) {
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

  return <Bar options={options} data={data} />
}
