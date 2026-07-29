import React from 'react'
import styles from './ManageEvent.module.css'
import Session from './Session/Session'
import { useState } from 'react'

const ManageEvent = () => {
    const [sessions, setSessions] = useState([
        {Title:"", Time:"", Credits:""}
    ]);
    const [popup, setPopup] = useState(false);
  return (
    <div className={styles.ManageEvent}>
        <div className={styles.FloatingCard}>
            hello
        </div>
        <div className={styles.EventDetails}>
            <div className={styles.Save}>Save</div>
            <div className={styles.Delete}>Delete</div>
            <div className={styles.TakeAttendance}>Take Attendace</div>
            <input className={styles.Title} placeholder={"Event Title"}></input>
            <div className={styles.Row2}>
                <input placeholder={"Event Description"} type='datetime-local'></input>
                <input placeholder={"Credits"}></input>
            </div>
            <div className={styles.Sessions}>
                {
                    sessions.map ((session) => 
                        <Session Title = {session.Title} Time = {session.Time} />
                    )
                }
            </div>
            <div className={styles.NewSession}
                onClick={()=>{
                    setSessions((prev) => [...prev, {Title:"", Time:"", Credits:""}])
                }}
            >
                Add New Session
            </div>
        </div>
    </div>
  )
}

export default ManageEvent