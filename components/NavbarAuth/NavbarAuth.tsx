import React, { useState } from 'react'
import styles from './NavbarAuth.module.scss'
import Link from 'next/link'
import { animated, useSpring } from 'react-spring'
import { HamburgerIcon } from '@chakra-ui/icons'

interface NavbarAuthProps {
  
}

export const NavbarAuth: React.FC<NavbarAuthProps> = ({}) => {
  const [toggleHamburguerIcon, setToggleHamburguerIcon] =
    useState<boolean>(false)

  const [flip, set] = useState(false)
  const ps = useSpring({
    to: { opacity: 0 },
    from: { opacity: 1 },
    reverse: flip,
  })

  return (
    <nav className={styles.navbar}>
      <h2 className={styles.navbarLogo}>Lorem Ipsum</h2>
      <ul className={styles.navbarList}>
        <li>
          <Link href='/menu'>Pedir</Link>
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
      </ul>
      {toggleHamburguerIcon && (
        <animated.h1
          style={ps}
          className={styles.navbarListMobileCustom}
        >
          <ul className={styles.navbarListMobile}>
            <li>
              <Link href='/menu'>Pedir</Link>
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
