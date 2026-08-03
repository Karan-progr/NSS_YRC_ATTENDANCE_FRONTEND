import React, { useEffect, useState } from 'react'
import styles from './Attendance.module.css'
import Header from '../Header/Header'
import EventCard from '../EventCard/EventCard'
import API_URL from '../../../config'
import Loading from '../Loading/Loading'

const Attendance = () => {

  const [tab, setTab] = useState("Attended");
  const [attended, setAttended] = useState(null);
  const [missed, setMissed] = useState(null);
  const percent = (0/80)*100;

  useEffect( ()=>{
    async function getData (){
      try{
        const res = await fetch (`${API_URL}/attendance`, {
          credentials:"include"
        })
        if (!res.ok){
          console.log ("Failed to fetch events");
          return;
        }
        const data = await res.json();
        setAttended(data.attended);
        setMissed(data.missed);
      }
      catch (err) {
        console.log (err);
      }
    }

    getData();

  }, [])


  return (
    <> 
        { attended && 
          <div className={styles.Attendance}>
              <div className={styles.AttendanceCard}>
                  <span style={{backgroundImage:`linear-gradient(90deg, var(--blue) ${percent}%, var(--white) ${percent}%)`}}></span>
                  <p>50/80 Hours Completed</p>
              </div>
              <div className={styles.Menu}>
                <p onClick={() => 
                  {
                    setTab("Attended");
                  }
                } className={`${tab === "Attended"? styles.Underline:""}`}>Attended</p>
                <p onClick={() => {
                  setTab("Missed");
                }} className={`${tab === "Missed"? styles.Underline:""}`} >Missed</p>
              </div>
              <div className={styles.Events}>
                {
                  tab === "Attended"
                  ?attended.map ((event) => 
                    <EventCard key={event.event_id} Title={event.title} Credits={event.credits} date={event.date} Status={event.status} EventID={event.event_id}/>
                  )
                  :missed.map ((event) => 
                    <EventCard key={event.event_id} Title={event.title} Credits={event.credits} date={event.date} Status={event.status} EventID={event.event_id}/>
                )}
              </div>
          </div>
        }
        {
          !attended && <Loading />
        }
    </>
  )
}

export default Attendance