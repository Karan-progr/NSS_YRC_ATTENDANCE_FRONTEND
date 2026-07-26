import React from 'react'
import style from './EventCard.module.css'
import { FaRegDotCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'

const EventCard = ({Title, Credits, Time, EndTime, Status, Details}) => {
  const navigate = useNavigate();
  return (
    <div className={style.EventCard}
      onClick={
        () => {
          const EventDetails = {Details:Details, Title:Title, Credits:Credits, Status:Status, EndTime:EndTime}
          localStorage.setItem("Details", JSON.stringify(EventDetails));
          navigate("/event-details");
        }
      }
    >
        <h2 className={style.Title}>{Title}</h2>
        <h2 className={style.Credits}>{Credits} Credits</h2>
        <h2 className={style.Time}>{Time}</h2>
        <h2 className={style.Status}
            style={{color:`${Status === "Happening"?"#34C759":"#E32636"}`}}
        ><FaRegDotCircle />{Status}</h2>
    </div>
  )
}

export default EventCard