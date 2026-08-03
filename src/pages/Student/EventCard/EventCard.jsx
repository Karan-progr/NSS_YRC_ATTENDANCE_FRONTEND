import React from 'react'
import style from './EventCard.module.css'
import { FaRegDotCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import API_URL from '../../../config';

const EventCard = ({Title, Credits, date, Status, EventID}) => {
  console.log (date);
  const navigate = useNavigate();
  return (
    <div className={style.EventCard}
      onClick={
        () => {
          function navme() {
            window.location.href = `http://localhost:3500/navme/${EventID}`;
          }
          navme();
        }
      }
    >
        <h2 className={style.Title}>{Title}</h2>
        <h2 className={style.Credits}>{Credits} Credits</h2>
        <h2 className={style.Time}>{date}</h2>
        <h2 className={style.Status}
            style={{color:`${Status === "Happening"?"#34C759":"#E32636"}`}}
        ><FaRegDotCircle />{Status}</h2>
    </div>
  )
}

export default EventCard