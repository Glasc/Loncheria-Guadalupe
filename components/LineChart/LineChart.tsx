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
import styles from './LineChart.module.scss'
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
      text: 'Line Chart',
    },
  },
}

interface LineChartProps {
  labels: string[]
  dataSetLabel: number[]
  title: string
}

export function LineChart({ labels, dataSetLabel, title }: LineChartProps) {
  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: dataSetLabel,
        borderColor: '#E94A30',
        backgroundColor: '#E94A30',
      },
    ],
  }

  return (
    <div className={styles.container}>
      <Line options={options} data={data} />
    </div>
  )
}
