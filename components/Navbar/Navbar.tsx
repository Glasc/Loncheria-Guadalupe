import React, { useState } from 'react'
import styles from './Navbar.module.scss'
import Link from 'next/link'
import { animated, useSpring } from 'react-spring'
import { HamburgerIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const router = useRouter()
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
      <h2 className={styles.navbarLogo}>
        <Link href='/'>Lonchería Glupe</Link>
      </h2>
      <ul className={styles.navbarList}>
        <li
          style={{
            color: `${router.pathname == '/menu' ? '#e94a30' : 'inherit'}`,
          }}
        >
          <Link href='/menu'>Menu</Link>
        </li>
      </ul>
      {toggleHamburguerIcon && (
        <animated.h1 style={ps} className={styles.navbarListMobileCustom}>
          <ul className={styles.navbarListMobile}>
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
