import React from 'react'
import styles from './EventDetail.module.css'
import Header from '../../components/Header/Header';
import EventCard from './EventCard/EventCard';

const EventDetail = () => {
  
    const Event = JSON.parse(localStorage.getItem("Details"));

    console.log (Event);

    return (
      <>
    <div className={styles.Header}>
      <Header Name={"KARAN"} Organisation={"NSS"}/>
      <div className={styles.Main}>
        <div className={styles.Box}>
          <h1 className={styles.Title}>{Event.Title}</h1>
          {Event.Details.slice(0, -1).map( (Event, index) =>
            <EventCard key={`${index}`} Time={Event.StartTime} Title={Event.Session} Position={"first"}/>
          )}
          <EventCard Time={Event.Details[Event.Details.length -1].StartTime} Title={Event.Details[Event.Details.length -1].Session} Position={"last"}/>
          <h1 className={styles.Status}>{Event.Status}</h1>
        </div>
        <div className={`${styles.Box} ${styles.Description}`}>
          <p>Description</p>
          <p>{Event.Description} This is an event description</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default EventDetail