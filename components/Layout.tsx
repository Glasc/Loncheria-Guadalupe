import React from 'react'
import styles from './Layout.module.scss'

interface LayoutProps {}

/* 

espera de confirmación
confirmado / rechazado
pendiente
entregado

*/

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <div className={styles.container}>{children}</div>
    </div>
  )
}
