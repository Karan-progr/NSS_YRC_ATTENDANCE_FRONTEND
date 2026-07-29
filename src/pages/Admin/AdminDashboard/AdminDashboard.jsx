import React from 'react'
import AdminHeader from '../AdminHeader/AdminHeader'
import { DashBoardCard } from './DashBoardCard/DashBoardCard'
import styles from './AdminDashboard.module.css'
import { useState, useEffect } from 'react';
import API_URL from '../../../config';
import EventCard from '../../Student/EventCard/EventCard';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {

  const [events, setEvents] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function getData (){
      try {
        const res = await fetch (`${API_URL}/events`, {
          credentials:"include",
        });
        if (!res.ok){
          console.log ("Event Fetch Failed");
          navigate("/login");
          return;
        }
        const data = await res.json();
        localStorage.setItem("Events", JSON.stringify(data));
        setEvents(JSON.parse(localStorage.getItem("Events")));
      }
      catch(e){
        console.log ("Failed to fetch eventdata");
        navigate("/login");
      }
    }
    getData();
  }, [])

  useEffect(() => {
    
  },[events])

  function formatTime(dateTime) {
      const date = new Date(dateTime);
      const today = new Date();
      const tomorrow = new Date(today);

      tomorrow.setDate(today.getDate() + 1);

      const isSameDay = (d1, d2) =>
          d1.getFullYear() === d2.getFullYear() &&
          d1.getMonth() === d2.getMonth() &&
          d1.getDate() === d2.getDate();

      const time = date.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
      });

      if (isSameDay(date, today)) {
          return `Today, ${time}`;
      }

      if (isSameDay(date, tomorrow)) {
          return `Tomorrow, ${time}`;
      }

      const formattedDate = date.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
      });

      return `${formattedDate}, ${time}`;
  }
  
  return (
    <div className={styles.AdminDashboard}>
        <div className={styles.DashBoardCard}>
          <DashBoardCard Title={"Quick Actions"} Contents={[
            ["+", "Add New Event", "/"],
            ["+", "Add New Post", "/"],
            ["~", "View Attendance Sheet", "/"],
            ["~", "View Students Sheet", "/"]
          ]} />

          <DashBoardCard Title={"Today's Overview"} Contents={[
            ["Events Happened : ", "3", "/"],
            ["Students Attended : ", "750", "/"],
            ["Posts Uploaded : ", "7", "/"],
            ["Students Registered : ", "40", "/"]
          ]} />
        </div>
        <div className={styles.Main}>
          {events?.filter((event) => event.status === "Happening").length > 0 && <h1>Current Event</h1>}
          <div className={styles.UpcomingEvents}>
              {events?.filter((Event) => Event.status === "Happening").map((Event) => <EventCard key={Event.title} Title={Event.title} Credits={Event.credits} Time={`Ends by ${formatTime(Event.endtime)}`} Status={Event.status} EndTime = {Event.endTime} EventID = {Event.event_id}/>)}
          </div>
          <h1>Upcoming Events</h1>
          <div className={styles.UpcomingEvents}>
              {events?.filter((Event) => Event.status === "Yet To Happen").map((Event) => <EventCard key={Event.title} Title={Event.title} Credits={Event.credits} Time={`Starts ${formatTime(Event.starttime)}`} Status={Event.status} EndTime = {Event.endtime} EventID = {Event.event_id}/>)}
          </div>
      </div>
    </div>
  )
}

export default AdminDashboard