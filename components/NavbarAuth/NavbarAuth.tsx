import React, { useState } from 'react'
import styles from './NavbarAuth.module.scss'
import Link from 'next/link'
import { animated, useSpring } from 'react-spring'
import { HamburgerIcon } from '@chakra-ui/icons'
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'next/router'

interface NavbarAuthProps {}

export const NavbarAuth: React.FC<NavbarAuthProps> = ({}) => {
  const [toggleHamburguerIcon, setToggleHamburguerIcon] =
    useState<boolean>(false)

  const router = useRouter()

  const [flip, set] = useState(false)
  const ps = useSpring({
    to: { opacity: 0 },
    from: { opacity: 1 },
    reverse: flip,
  })

  const handleLogOut = () => {
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log('Success')
        router.push('/')
      })
      .catch((error) => {
        // An error happened.
        console.log('oops')
      })
  }

  return (
    <nav className={styles.navbar}>
      <h2 className={styles.navbarLogo}>
        <Link href='/pedidos'>Lorem Ipsum</Link>
      </h2>
      <ul className={styles.navbarList}>
        <li>
          <Link href='/ordenar'>Ordenar</Link>
        </li>
        <li>
          <Link href='/pedidos'>Pedidos</Link>
        </li>
        <li>
          <Link href='/cuenta'>Cuenta</Link>
        </li>
        <li>
          <Link href='/menu'>Menu</Link>
        </li>
        <li style={{ cursor: 'pointer' }}>
          <a onClick={handleLogOut}>Salir</a>
        </li>
      </ul>
      {toggleHamburguerIcon && (
        <animated.h1 style={ps} className={styles.navbarListMobileCustom}>
          <ul className={styles.navbarListMobile}>
            <li>
              <Link href='/ordenar'>Ordenar</Link>
            </li>
            <li>
              <Link href='/pedidos'>Pedidos</Link>
            </li>
            <li>
              <Link href='/cuenta'>Cuenta</Link>
            </li>
            <li>
              <Link href='/menu'>Menu</Link>
            </li>
            <li style={{ cursor: 'pointer' }}>
              <a onClick={handleLogOut}>Salir</a>
            </li>
          </ul>
        </animated.h1>
      )}
      <HamburgerIcon
        className={styles.hamburgerIcon}
        d='none'
        w={7}
        h={7}
        color='white'
        onClick={() => {
          setToggleHamburguerIcon(!toggleHamburguerIcon)
          set(!flip)
        }}
      />
    </nav>
  )
}
