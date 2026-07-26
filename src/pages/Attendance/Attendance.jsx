import React, { useState } from 'react'
import styles from './Attendance.module.css'
import Header from '../../components/Header/Header'
import EventCard from '../../components/EventCard/EventCard'

const Attendance = () => {

  const [tab, setTab] = useState("Attended");
  const percent = (50/80)*100;

  return (
    <>
        < Header Name = "KARAN" Organisation={"NSS"} />
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
              <EventCard Title={"Hello"} Credits={3} Time={"Today 12:40 PM"} Status={"Finished"}/>
            </div>
        </div>
    </>
  )
}

export default Attendance