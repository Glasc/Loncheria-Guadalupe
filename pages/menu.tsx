import { NextPage } from 'next'
import { Navbar } from '../components/Navbar/Navbar'
import styles from '../styles/Menu.module.scss'
import { Layout } from '../components/Layout'

// TODO: Navbar should change if user is logged in

interface MenuProps {}

const Menu: NextPage = ({}) => {
  return (
    <Layout>
      <div className={styles.container}>
        <Navbar />
        <div className={styles.menuContent}>
          <h2 className={styles.headline}>Menú</h2>

          <div className={styles.section}>
            <h2>Torta</h2>
            <div className={styles.sectionElements}>
              <p className={styles.product}>Pierna</p>
              <p className={styles.price}>$30</p>
            </div>
            <div className={styles.sectionElements}>
              <p className={styles.product}>Pierna</p>
              <p className={styles.price}>$30</p>
            </div>
            <div className={styles.sectionElements}>
              <p className={styles.product}>Pierna</p>
              <p className={styles.price}>$30</p>
            </div>
            <div className={styles.sectionElements}>
              <p className={styles.product}>Pierna</p>
              <p className={styles.price}>$30</p>
            </div>
          </div>

          <div className={styles.section}>
            <h2>Torta</h2>
            <div className={styles.sectionElements}>
              <p className={styles.product}>Pierna</p>
              <p className={styles.price}>$30</p>
            </div>
            <div className={styles.sectionElements}>
              <p className={styles.product}>Pierna</p>
              <p className={styles.price}>$30</p>
            </div>
            <div className={styles.sectionElements}>
              <p className={styles.product}>Pierna</p>
              <p className={styles.price}>$30</p>
            </div>
            <div className={styles.sectionElements}>
              <p className={styles.product}>Pierna</p>
              <p className={styles.price}>$30</p>
            </div>
          </div>

          <div className={styles.section}>
            <h2>Torta</h2>
            <div className={styles.sectionElements}>
              <p className={styles.product}>Pierna</p>
              <p className={styles.price}>$30</p>
            </div>
            <div className={styles.sectionElements}>
              <p className={styles.product}>Pierna</p>
              <p className={styles.price}>$30</p>
            </div>
            <div className={styles.sectionElements}>
              <p className={styles.product}>Pierna</p>
              <p className={styles.price}>$30</p>
            </div>
            <div className={styles.sectionElements}>
              <p className={styles.product}>Pierna</p>
              <p className={styles.price}>$30</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Menu
