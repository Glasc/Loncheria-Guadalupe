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

const Dashboard: NextPage = () => {
  const { sales } = useSalesV()
  const [salesLabel, setSalesLabel] = useState<any[]>([])
  const [salesData, setSalesData] = useState<any[]>([])

  useEffect(() => {
    if (!sales) return

    // sorts an array of string dates
    const labels = sales.map((sale: any) => stringToDate(sale.date))
    const labelsSorted = sortDates(labels)

    const data = sales.map((sale: any) => sale.totalSales)

    setSalesLabel(labelsSorted)
    setSalesData(data)
  }, [sales])

  return (
    <Layout>
      <NavbarAdmin />
      <div className={styles.container}>
        <LineChart dataSetLabel={salesData} labels={salesLabel} />
        <BarChart dataSetLabel={salesData} labels={salesLabel} />
      </div>
    </Layout>
  )
}

export default Dashboard
