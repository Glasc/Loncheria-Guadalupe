import styles from './BarChart.module.scss'
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
      text: 'Bar Chart',
    },
  },
}

interface BarChartProps {
  labels: string[]
  dataSetLabel: number[]
  title: string
}

export function BarChart({ labels, dataSetLabel, title }: BarChartProps) {
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
      <Bar options={options} data={data} />
    </div>
  )
}
