import React, { useState, useEffect } from 'react'
import styles from './EventDetail.module.css'
import Header from '../Header/Header';
import { useParams } from 'react-router-dom'
import EventCard from './EventCard/EventCard';
import API_URL from '../../../config';

const EventDetail = ({Credits}) => {

    const [event, setEvent] = useState();
  
    const param = useParams();

    useEffect(()=>{
      async function getData() {
        const res = await fetch(`${API_URL}/events/${Number(param.eventId)}`, {
          credentials:"include"
        });
        const data = await res.json();

        setEvent(data); 
        console.log (data.Sessions);
      }

      getData();
      
    }, [])

    async function getAttendanceDetails() {
      const res = await fetch(`${API_URL}/get-attendance-details/${param.eventId}`, {
        credentials:"include"
      });
      const data = await res.json ();
      localStorage.setItem("ip", data.ip);
      if (data.attendance_type === "LAN");
        window.location.href = `/scanner/${param.eventId}`
    }

    const EventStatusMap = {"happening":"MarkAttendance", "otherwise":`${Credits}`}

    return (
    <div className={styles.Header}>
      {event && <div className={styles.Main}>
        <div className={styles.Box}>
          <div className={styles.EventHeader}>
            <h1 className={styles.Title}>{event.Title}</h1>
            {true &&
              <p onClick={() => {
                getAttendanceDetails();
              }} className={styles.MarkAttendance}>Mark Attendance</p>}
          </div>
          {event.Sessions.slice(0, -1).map( (Session, index) =>
            <EventCard key={`${index}`} Time={Session.starttime} Title={Session.title} Position={"first"}/>
          )}
          <EventCard Time={event.Sessions[event.Sessions.length -1].starttime} Title={event.Sessions[event.Sessions.length -1].title} Position={"last"}/>
          <h1 className={styles.Status}>{event.Status}</h1>
        </div>
        <div className={`${styles.Box} ${styles.Description}`}>
          <p>Description</p>
          <p>{event.Description}</p>
        </div>
      </div>}
    </div>
  )
}

export default EventDetail