import React, { useState } from 'react'
import styles from './NavbarAdmin.module.scss'
import Link from 'next/link'
import { animated, useSpring } from 'react-spring'
import { HamburgerIcon } from '@chakra-ui/icons'
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'next/router'

interface NavbarAdminProps {}

export const NavbarAdmin: React.FC<NavbarAdminProps> = ({}) => {
  const [toggleHamburguerIcon, setToggleHamburguerIcon] =
    useState<boolean>(false)

  const [flip, set] = useState(false)
  const ps = useSpring({
    to: { opacity: 0 },
    from: { opacity: 1 },
    reverse: flip,
  })

  const router = useRouter()

  const handleLogOut = () => {
    const auth = getAuth()
    signOut(auth)
      .then(() => {
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
          <Link href='/ordenar'>Menú</Link>
        </li>
        <li>
          <Link href='/cuenta'>Cuenta</Link>
        </li>
        <li>
          <Link href='/admin/ventas'>Ventas</Link>
        </li>
        <li>
          <Link href='/admin/control'>Control</Link>
        </li>
        <li style={{ cursor: 'pointer' }}>
          <a onClick={handleLogOut}>Salir</a>
        </li>
      </ul>
      {toggleHamburguerIcon && (
        <animated.h1 style={ps} className={styles.navbarListMobileCustom}>
          <ul className={styles.navbarListMobile}>
            <li>
              <Link href='/ordenar'>Menú</Link>
            </li>
            <li>
              <Link href='/pedidos'>Cuenta</Link>
            </li>
            <li>
              <Link href='/cuenta'>Ventas</Link>
            </li>
            <li>
              <Link href='/admin/control'>Control</Link>
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
