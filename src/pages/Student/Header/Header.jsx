import React, { useState, useEffect } from 'react'
import styles from './Header.module.css'
import { Link } from 'react-router-dom';

const Header = ({Name, Organisation, Photo}) => {
  
  const [open, setOpen] = useState(false);

  const [width, setWidth] = useState([60, 45, 30]);

    return (
    <div className={styles.Header}>
        <img src={Photo} alt="Photo" />
        <div className={styles.Name}>
            <h1>Hi {Name.split(" ")[0]}</h1>
            <h1>{Organisation} VOLUNTEER</h1>
        </div>
        <div className={styles.MenuBtn}
            onClick={() => {setWidth((prev) => [...prev].reverse()); setOpen((prev) => !prev)}}
        >
            <span style={{width: `${width[0]}px`}}></span>
            <span style={{width: `${width[1]}px`}}></span>
            <span style={{width: `${width[2]}px`}}></span>
        </div>
        <div className={`${styles.Menu} ${open ? styles.Open:""}`} onClick={()=>setOpen(false)}>
            <h1 className={styles.MenuButton}>Posts</h1>
            <Link className={styles.MenuButton} to="/attendance">Attendance</Link>
            <h1 className={styles.MenuButton}>Settings</h1>
            <h1 className={styles.MenuButton}>Logout</h1>
        </div>
    </div>
  )
}

export default Header