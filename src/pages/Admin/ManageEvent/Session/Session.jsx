import React from 'react'
import styles from './Session.module.css'

const Session = ({Title, Time}) => {
  return (
    <div className={styles.Session}>
        <input className={styles.Title} type="text" placeholder='Session Title' required value={Title} />
        <input type="datetime-local" required value={Time}/>
    </div>
  )
}

export default Session