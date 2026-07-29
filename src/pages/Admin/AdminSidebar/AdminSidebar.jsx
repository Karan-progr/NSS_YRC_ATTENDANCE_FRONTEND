import React from 'react'
import styles from './AdminSideBar.module.css'

const AdminSidebar = () => {
  return (
    <div className={styles.AdminSidebar}>
        <h1>Dashboard</h1>
        <h1>Posts</h1>
        <h1>Settings</h1>
        <h1>logout</h1>
    </div>
  )
}

export default AdminSidebar