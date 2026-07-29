import React, { useState, useEffect } from 'react'
import styles from './EventDetail.module.css'
import Header from '../Header/Header';
import { useParams } from 'react-router-dom'
import EventCard from './EventCard/EventCard';
import API_URL from '../../../config';

const EventDetail = () => {

    const [event, setEvent] = useState();
  
    const param = useParams();

    useEffect(()=>{
      async function getData() {
        const res = await fetch(`${API_URL}/events/${Number(param.eventId)}`, {
          credentials:"include"
        });
        const data = await res.json();

        setEvent(data); 
        console.log ();
      }

      getData();
      
    }, [])

    return (
    <div className={styles.Header}>
      {event && <div className={styles.Main}>
        <div className={styles.Box}>
          <h1 className={styles.Title}>{event.Title}</h1>
          {event.Sessions.slice(0, -1).map( (Session, index) =>
            <EventCard key={`${index}`} Time={Session.starttime} Title={Session.title} Position={"first"}/>
          )}
          <EventCard Time={event.Sessions[event.Sessions.length -1].starttime} Title={event.Sessions[event.Sessions.length -1].title} Position={"last"}/>
          <h1 className={styles.Status}>{event.Status}</h1>
        </div>
        <div className={`${styles.Box} ${styles.Description}`}>
          <p>Description</p>
          <p>{event.Description} This is an event description</p>
        </div>
      </div>}
    </div>
  )
}

export default EventDetail