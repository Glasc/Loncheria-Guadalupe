import type { NextPage } from 'next'
import Image from 'next/image'
import { Layout } from '../components/Layout'
import styles from '../styles/Home.module.scss'
import { useState, useEffect } from 'react'
import { Navbar } from '../components/Navbar/Navbar'
import { useColorMode } from '@chakra-ui/color-mode'
import ModalLogin from '../components/UI/auth/ModalLogin'
import { ModalRegister } from '../components/UI/auth/ModalRegister'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { auth } from '../firebase/firebaseConfig'
import { saveUser, setUserID } from '../redux/authSlice'
import { onAuthStateChanged, getAuth } from '@firebase/auth'
import { useRouter } from 'next/router'
import { Loading } from '../utils/Loading'

const Home: NextPage = (props) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.value) || null

  const [showMain, setShowMain] = useState<boolean>(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(saveUser(user.refreshToken))
        dispatch(setUserID(user.uid))
        router.push('/pedidos')
      } else {
        dispatch(saveUser(undefined))
        setShowMain(true)
        dispatch(setUserID(null))
      }
    })
  }, [dispatch, router])

  if (showMain) {
    return (
      <Layout>
        <>
          <Navbar />
          <Hero />
          <CardsContent />
        </>
      </Layout>
    )
  }

  return <Loading />
}

const Hero = () => {
  const { toggleColorMode } = useColorMode()

  return (
    <section className={styles.hero}>
      <aside className={styles.heroDescription}>
        <h1>
          Una tradición en{' '}
          <span style={{ color: '#ED3C1F' }}>tortas y sándwich</span> a la
          plancha
        </h1>
        <p>Abrimos de Lunes a Viernes. Servicio a Domicilio Col. Centro</p>
        <div className={styles.heroButtonWrapper}>
          <ModalLogin />
          <ModalRegister />
          {/* <Button
            className={styles.heroButton}
            variant='outline'
            size='md'
          >
            Regístrate
          </Button> */}
        </div>
      </aside>
      <div className={styles.heroImageWrapper}>
        <Image
          className={styles.heroImage}
          src='/assets/lonche.png'
          alt='Tortita'
          width={426}
          height={250}
          layout='intrinsic'
        />
      </div>
    </section>
  )
}

const CardsContent = () => {
  return (
    <footer className={styles.footer}>
      <section className={styles.footerCardContainer}>
        <article className={styles.footerCard}>
          <div className={styles.footerCardImage}>
            <Image
              src='/assets/sandwich_plancha.webp'
              alt='Sándwich'
              width={430}
              height={260}
              layout='intrinsic'
            />
          </div>
          <div className={styles.footerCardDescription}>
            <h3>Sándwich</h3>
            <p>
              Sándwiches de jamón y queso para una meriendita de amigos o
              una desayuno ligera.{' '}
            </p>
          </div>
        </article>
        <article className={styles.footerCard}>
          <div className={styles.footerCardImage}>
            <Image
              src='/assets/torta_plancha.jpg'
              alt='Torta'
              width={430}
              height={260}
              layout='intrinsic'
            />
          </div>
          <div className={styles.footerCardDescription}>
            <h3>Torta</h3>
            <p>
              Tortas con cualquier ingrediente tradicional calentadas a la
              plancha
            </p>
          </div>
        </article>
        <article className={styles.footerCard}>
          <div className={styles.footerCardImage}>
            <Image
              src='/assets/sincronizada.jpg'
              alt='Sincronizada'
              width={430}
              height={260}
              layout='intrinsic'
            />
          </div>
          <div className={styles.footerCardDescription}>
            <h3>Sincronizada</h3>
            <p>
              Antojito formado por dos tortillas entre las que se pone
              jamón y queso.
            </p>
          </div>
        </article>
      </section>
    </footer>
  )
}

export default Home
