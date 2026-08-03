import React from 'react'
import AdminHeader from '../AdminHeader/AdminHeader'
import { DashBoardCard } from './DashBoardCard/DashBoardCard'
import styles from './AdminDashboard.module.css'
import { useState, useEffect } from 'react';
import API_URL from '../../../config';
import EventCard from '../../Student/EventCard/EventCard';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {

  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const [happened, setHappened] = useState([]);
  const [happening, setHappening] = useState([]);
  const [YetToHappen, setYetToHappen] = useState([]);

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
        setEvents(data);
        console.log (data);

        setHappened (data.filter((event) => event.status === "Happened"));
        setHappening (data.filter((event) => event.status === "Happening"));
        setYetToHappen (data.filter((event) => event.status === "Yet To Happen"));

      }
      catch(e){
        console.log ("Failed to fetch eventdata" , e);
        navigate("/login");
      }
    }
    getData();
  }, [])



  useEffect(() => {
    console.log ("happened list", happened);
  },[happened])


  if (!events) return ("loading");
  
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
          {happening.length > 0 && (
            <div className={styles.UpcomingEvents}>
              <h1>Current Events</h1>
              {happening.map((Event) => (
                <EventCard
                  key={Event.event_id}
                  Title={Event.title}
                  Credits={Event.credits}
                  date={`Ends by ${Event.endtime.slice(0, 5)}`}
                  Status={Event.status}
                  EndTime={Event.endtime}
                  EventID={Event.event_id}
                />
              ))}
            </div>
          )}

          {YetToHappen.length > 0 && (
            <div className={styles.UpcomingEvents}>
              <h1>Upcoming Events</h1>
              {YetToHappen.map((Event) => (
                <EventCard
                  key={Event.event_id}
                  Title={Event.title}
                  Credits={Event.credits}
                  date={`Starts on ${Event.date.split("T")[0].split('-').reverse().join('-')} at ${Event.endtime.slice(0, 5)}`}
                  Status={Event.status}
                  EndTime={Event.endtime}
                  EventID={Event.event_id}
                />
              ))}
            </div>
          )}

          {happened.length > 0 && (
            <div className={styles.UpcomingEvents}>
              <h1>Finished Events</h1>
              {happened.map((Event) => (
                <EventCard
                  key={Event.event_id}
                  Title={Event.title}
                  Credits={Event.credits}
                  date={`Ended on ${Event.date.split("T")[0].split('-').reverse().join('-')} at ${Event.endtime.slice(0, 5)}`}
                  Status={Event.status}
                  EndTime={Event.endtime}
                  EventID={Event.event_id}
                />
              ))}
            </div>
          )}
        </div>
    </div>
  )
}

export default AdminDashboard