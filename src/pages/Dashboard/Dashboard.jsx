import React, { useState } from 'react'
import styles from './Dashboard.module.css'
import Header from '../../components/Header/Header'
import EventCard from '../../components/EventCard/EventCard'
import API_URL from '../../config'
import { useEffect } from 'react'

const Dashboard = () => {

  const [user, setUser] = useState();
    useEffect(() => {
      async function getData (){
        try {
          const res = await fetch (`${API_URL}/dashboard`, {
            method:"GET",
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("Token")}`
            }
          });
          const data = await res.json();
          localStorage.setItem("User", data);
          setUser(localStorage.getItem("User"));
        }
        catch(e){
          console.log (e);
        }
      }
      getData();
    }, [])
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
const Events = [
  {
    Title: "Blood Donation Awareness",
    Credits: 3,
    StartTime: "2026-07-25T01:00:00",
    EndTime: "2026-07-25T01:00:00",
    Status: "Happening",
    Details: [
      { Session: "Registration", StartTime: "2026-08-15T14:40:00" },
      { Session: "Welcome Address", StartTime: "2026-08-15T14:50:00" },
      { Session: "Awareness Seminar", StartTime: "2026-08-15T15:00:00" },
      { Session: "Blood Donation Drive", StartTime: "2026-08-15T15:20:00" },
      { Session: "Vote of Thanks", StartTime: "2026-08-15T15:55:00" },
    ],
  },
  {
    Title: "Tree Plantation Drive",
    Credits: 2,
    StartTime: "2026-08-16T15:30:00",
    EndTime: "2026-08-16T17:00:00",
    Status: "Yet To Start",
    Details: [
      { Session: "Volunteer Assembly", StartTime: "2026-08-16T15:30:00" },
      { Session: "Sapling Distribution", StartTime: "2026-08-16T15:40:00" },
      { Session: "Plantation Activity", StartTime: "2026-08-16T15:50:00" },
      { Session: "Maintenance Briefing", StartTime: "2026-08-16T16:40:00" },
      { Session: "Group Photo", StartTime: "2026-08-16T16:55:00" },
    ],
  },
  {
    Title: "Campus Cleanliness Campaign",
    Credits: 2,
    StartTime: "2026-08-17T16:15:00",
    EndTime: "2026-08-17T17:30:00",
    Status: "Yet To Start",
    Details: [
      { Session: "Team Formation", StartTime: "2026-08-17T16:15:00" },
      { Session: "Area Allocation", StartTime: "2026-08-17T16:25:00" },
      { Session: "Cleaning Activity", StartTime: "2026-08-17T16:30:00" },
      { Session: "Waste Segregation", StartTime: "2026-08-17T17:10:00" },
      { Session: "Closing Remarks", StartTime: "2026-08-17T17:25:00" },
    ],
  },
  {
    Title: "Health Check-up Camp",
    Credits: 4,
    StartTime: "2026-08-18T17:00:00",
    EndTime: "2026-08-18T19:00:00",
    Status: "Yet To Start",
    Details: [
      { Session: "Registration", StartTime: "2026-08-18T17:00:00" },
      { Session: "General Check-up", StartTime: "2026-08-18T17:15:00" },
      { Session: "BMI & BP Screening", StartTime: "2026-08-18T17:45:00" },
      { Session: "Doctor Consultation", StartTime: "2026-08-18T18:15:00" },
      { Session: "Health Awareness Talk", StartTime: "2026-08-18T18:45:00" },
    ],
  },
];
  return (
    <div className={styles.Dashboard}>
        <Header Name={"KARAN M"} Organisation={"NSS"} Photo={"https:lorempicsum/200/200"} />
        <div className={styles.Main}>
            <h1>Current Event</h1>
            <div className={styles.UpcomingEvents}>
                {Events.filter((Event) => Event.Status === "Happening").map((Event) => <EventCard key={Event.Title} Title={Event.Title} Credits={Event.Credits} Time={`Ends by ${formatTime(Event.EndTime)}`} Status={Event.Status} Details = {Event.Details} EndTime = {Event.EndTime}/>)}
            </div>
            <h1>Upcoming Events</h1>
            <div className={styles.UpcomingEvents}>
                {Events.filter((Event) => Event.Status === "Yet To Start").map((Event) => <EventCard key={Event.Title} Title={Event.Title} Credits={Event.Credits} Time={`Starts ${formatTime(Event.StartTime)}`} Status={Event.Status} Details = {Event.Details} EndTime = {Event.EndTime}/>)}
            </div>
        </div>
    </div>
  )
}

export default Dashboard