import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import Header from '../Header/Header';
import EventCard from '../EventCard/EventCard';
import API_URL from '../../../config';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';

const Dashboard = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState();
  const [happened, setHappened] = useState([]);
  const [happening, setHappening] = useState([]);
  const [YetToHappen, setYetToHappen] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(`${API_URL}/events`, {
          credentials: "include",
        });

        if (!res.ok) {
          console.log("Event Fetch Failed");
          navigate("/login");
          return;
        }

        const data = await res.json();

        setEvents(data);

        setHappening(
          data.filter((event) => event.status === "Happening")
        );

        setYetToHappen(
          data.filter((event) => event.status === "Yet To Happen")
        );

        setHappened(
          data.filter((event) => event.status === "Happened")
        );

        console.log(data);
      } catch (e) {
        console.log("Failed to fetch eventdata");
        navigate("/login");
      }
    }

    getData();
  }, []);

  if (!events) return <Loading />;

  return (
    <div className={styles.Dashboard}>
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
                EventID={Event.event_id}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;