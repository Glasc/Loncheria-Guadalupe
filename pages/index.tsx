import { Button } from '@chakra-ui/button'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Layout } from '../components/Layout'
import styles from '../styles/Home.module.scss'
import Link from 'next/link'
import { HamburgerIcon } from '@chakra-ui/icons'
import { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import { Navbar } from '../components/Navbar/Navbar'
import ModalHome from '../components/UI/ModalHome'
import { useColorMode } from '@chakra-ui/color-mode'

const Home: NextPage = (props) => {
  return (
    <Layout>
      <Navbar />
      <Hero />
      <CardsContent />
    </Layout>
  )
}

const Hero = () => {
  const { toggleColorMode } = useColorMode()
  return (
    <section className={styles.hero}>
      <aside className={styles.heroDescription}>
        <h1>
          Lorem ipsum dolor sit{' '}
          <span style={{ color: '#ED3C1F' }}>amet, consectetur</span>{' '}
          adipiscing elit ut
        </h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut</p>
        <div className={styles.heroButtonWrapper}>
          <ModalHome />
          <Button
            className={styles.heroButton}
            variant='outline'
            size='md'
          >
            Regístrate
          </Button>
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
              src='/assets/torta2.jpg'
              alt='Tortita'
              width={430}
              height={250}
              layout='intrinsic'
            />
          </div>
          <div className={styles.footerCardDescription}>
            <h3>Lorem Ipsum Dolor</h3>
            <h4>Lorem ipsum dolor sit amet.</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </article>
        <article className={styles.footerCard}>
          <div className={styles.footerCardImage}>
            <Image
              src='/assets/torta2.jpg'
              alt='Tortita'
              width={430}
              height={260}
              layout='intrinsic'
            />
          </div>
          <div className={styles.footerCardDescription}>
            <h3>Lorem Ipsum Dolor</h3>
            <h4>Lorem ipsum dolor sit amet.</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </article>
        <article className={styles.footerCard}>
          <div className={styles.footerCardImage}>
            <Image
              src='/assets/torta2.jpg'
              alt='Tortita'
              width={430}
              height={250}
              layout='intrinsic'
            />
          </div>
          <div className={styles.footerCardDescription}>
            <h3>Lorem Ipsum Dolor</h3>
            <h4>Lorem ipsum dolor sit amet.</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </article>
      </section>
    </footer>
  )
}

export default Home
