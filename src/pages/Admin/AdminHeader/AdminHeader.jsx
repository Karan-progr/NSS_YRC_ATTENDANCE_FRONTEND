import React from 'react'
import styles from './AdminHeader.module.css'

const AdminHeader = () => {
  return (
    <div className={styles.AdminHeader}>
      <img className={styles.Banner} src="/banner.png" alt="Shiv Nadar University" />
      <div className={styles.Photo}>
        <p className={styles.Name}>Hi KARAN</p>
        <img src="https://picsum.photos/30/30" alt="Photo" />
      </div>
    </div>
  )
}

export default AdminHeader