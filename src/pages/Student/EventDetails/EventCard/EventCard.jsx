import React, { useEffect } from 'react'
import styles from './EventCard.module.css'
import API_URL from '../../../../config';

const EventCard = ({Position, Time, Title}) => {

  return (
    <div className={styles.EventCard}>
        <div className={styles.Timeline}>
            <span className={styles.Circle}></span>
            {Position === "first" && <span className={styles.Rectangle}></span>}
        </div>
        <h1 className={styles.EventTitle}>{Title}</h1>
        <p className={styles.Time}>{Time.slice(0, 5)}</p>
    </div>
  ) 
}

export default EventCard