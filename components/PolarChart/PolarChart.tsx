import styles from './PolarChart.module.scss'
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { PolarArea } from 'react-chartjs-2'

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Polar Chart',
    },
  },
}

interface PolarChartProps {
  labels: string[]
  dataSetLabel: number[]
  title: string
}

export function PolarChart({ labels, dataSetLabel, title }: PolarChartProps) {
  const backgroundColors = labels.map((currentLabel) => {
    // no faker
    const randomHexColor =
      '#' + Math.floor(Math.random() * 16777215).toString(16)
    return randomHexColor
  })

  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: dataSetLabel,
        backgroundColor: backgroundColors,
      },
    ],
  }

  return (
    <div className={styles.container}>
      <PolarArea options={options} data={data} />
    </div>
  )
}
