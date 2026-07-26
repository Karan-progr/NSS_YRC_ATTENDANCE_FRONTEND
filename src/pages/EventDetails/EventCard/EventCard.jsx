import React from 'react'
import styles from './EventCard.module.css'

const EventCard = ({Title, Description, Time, Position}) => {
  return (
    <div className={styles.EventCard}>
        <div className={styles.Timeline}>
            <span className={styles.Circle}></span>
            {Position === "first" && <span className={styles.Rectangle}></span>}
        </div>
        <h1 className={styles.EventTitle}>{Title}</h1>
        <p className={styles.Time}>{new Date(Time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</p>
    </div>
  )
}

export default EventCard