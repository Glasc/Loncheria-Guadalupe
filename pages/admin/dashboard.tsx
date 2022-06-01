import { NextPage } from 'next'
import { Layout } from '../../components/Layout'
import { NavbarAdmin } from '../../components/NavbarAdmin/NavbarAdmin'
import styles from './dashboard.module.scss'
import { useState, useEffect } from 'react'
import useSalesV from '../../hooks/useSalesV'
import { LineChart } from '../../components/LineChart/LineChart'
import stringToDate from '../../helpers/stringToDate'
import sortDates from '../../helpers/sortDates'
import { BarChart } from '../../components/BarChart/BarChart'
import { Select, Text } from '@chakra-ui/react'
import { LightMode } from '@chakra-ui/color-mode'
import { PolarChart } from '../../components/PolarChart/PolarChart'
import loopOrders from '../../helpers/loopOrders'
type ChartModes = 'barra' | 'línea'

interface ChartProps {
  labels: string[]
  data: any[]
  chartMode: ChartModes
  title: string
}

const Chart = ({ labels, data, chartMode, title }: ChartProps) => {
  const renderChart = () => {
    switch (chartMode) {
      case 'barra':
        return <BarChart title={title} labels={labels} dataSetLabel={data} />
      case 'línea':
        return <LineChart title={title} labels={labels} dataSetLabel={data} />
      default:
        return null
    }
  }

  return (
    <div className={styles.chart}>
      <Text textAlign='center' fontSize={25} paddingBottom={3}>
        {title}
      </Text>
      {renderChart()}
    </div>
  )
}

const Dashboard: NextPage = () => {
  const [chartMode, setChartMode] = useState<ChartModes>('barra')
  const { sales } = useSalesV()
  const [salesLabel, setSalesLabel] = useState<any[]>([])
  const [salesData, setSalesData] = useState<any[]>([])
  const [totalOrdersData, setTotalOrdersData] = useState<any[]>([])
  const [totalUsersRegistered, totalSetUsersRegistered] = useState<any[]>([])
  // orders
  const [ordersLabel, setOrdersLabel] = useState<any[]>([])
  const [ordersData, setOrdersData] = useState<any[]>([])

  useEffect(() => {
    if (!sales) return
    const labels = sales.map((sale: any) => stringToDate(sale.date))
    const labelsSorted = sortDates(labels)

    const salesData = sales.map((sale: any) => sale.totalSales)
    const totalOrdersData = sales.map((sale: any) => sale.totalOrders)
    const usersRegistered = sales.map((sale: any) => sale.totalUsersRegistered)
    // orders
    const temp = sales.map((sale: any) => sale.orderList)
    const ordersByAmount = loopOrders(temp[temp.length - 1])
    const orderLabel = Object.keys(ordersByAmount)
    const orderData = Object.values(ordersByAmount)

    setSalesLabel(labelsSorted)
    setSalesData(salesData)
    setTotalOrdersData(totalOrdersData)
    totalSetUsersRegistered(usersRegistered)
    setOrdersLabel(orderLabel)
    setOrdersData(orderData)
  }, [sales])

  const handleSelectorClick = (e: any) => {
    if (!e.target.value) return
    setChartMode(e.target.value)
  }

  return (
    <Layout>
      <NavbarAdmin />
      <div className={styles.selector}>
        <LightMode>
          <Select
            placeholder='Seleccionar modo'
            background='white'
            fontSize={17}
            color='white'
            border='none'
            backgroundColor='#5a5150'
            onClick={handleSelectorClick}>
            <option value='barra'>Barra</option>
            <option value='línea'>Línea</option>
          </Select>
        </LightMode>
      </div>
      <div className={styles.container}>
        <Chart
          chartMode={chartMode}
          data={salesData}
          labels={salesLabel}
          title='Ventas'
        />

        <Chart
          chartMode={chartMode}
          data={totalOrdersData}
          labels={salesLabel}
          title='Pedidos'
        />

        <Chart
          chartMode={chartMode}
          data={totalUsersRegistered}
          labels={salesLabel}
          title='Usuarios Nuevos'
        />
      </div>
      <div className={styles.bigChart}>
        <Text textAlign='center' fontSize={25} paddingBottom={3} color='white'>
          Pedidos del último turno
        </Text>
        <PolarChart
          title='Pedidos del último turno'
          labels={ordersLabel}
          dataSetLabel={ordersData}
        />
      </div>
    </Layout>
  )
}

export default Dashboard
