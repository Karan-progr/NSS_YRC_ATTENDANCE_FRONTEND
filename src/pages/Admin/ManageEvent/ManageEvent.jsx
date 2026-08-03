import React, { useEffect, useState } from "react";
import styles from "./ManageEvent.module.css";
import Session from "./Session/Session";
import API_URL from "../../../config";

import { FaCamera, FaWifi } from "react-icons/fa";
import { FaTowerCell } from "react-icons/fa6";
import { Bs123 } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { ImQrcode } from "react-icons/im";

const ManageEvent = () => {

    const { eventId } = useParams();

    const [popup, setPopup] = useState(false);

    const [eventDetails, setEventDetails] = useState({
        Title: "",
        Description: "",
        Credits: "",
        Date:"",
        Sessions: [
            {
                title: "",
                description: "",
                starttime: ""
            }
        ]
    });

    const [choice, setChoice] = useState([null, null]);

    useEffect(() => {
        async function getEventData() {

            const res = await fetch(`${API_URL}/events/${eventId}`, {
                credentials: "include"
            });

            const data = await res.json();

            if (res.ok)
                setEventDetails(data);
        }

        getEventData();


    }, [eventId]);

    useEffect(()=>{console.log(eventDetails)}, [eventDetails])

    function updateSession(index, field, value) {

        setEventDetails(prev => {

            const sessions = [...prev.Sessions];

            sessions[index] = {
                ...sessions[index],
                [field]: value
            };

            return {
                ...prev,
                Sessions: sessions
            };

        });

    }

    function addSession() {

        setEventDetails(prev => ({
            ...prev,
            Sessions: [
                ...prev.Sessions,
                {
                    title: "",
                    description: "",
                    starttime: ""
                }
            ]
        }));

    }

    async function saveEvent() {

        const res = await fetch(`${API_URL}/update-event/${eventId}`, {

            method: "PUT",
            credentials: "include",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(eventDetails)

        });

        console.log ("Data send to backend : ", eventDetails);


        if (res.ok)
            alert("Saved");

    }

    async function handleAttendance(choice) {

        window.location.href = `/admin/attendance/${eventId}/${choice[0]}/${choice[1]}`;

    }

    return (

        <div className={styles.ManageEvent}>

            <div className={`${styles.FloatingCard} ${popup ? styles.popup : ""}`}>

                <div className={styles.optionOne}>
                    <div
                        className={`${styles.Icon} ${
                            choice[0] === "qr" ? styles.Highlight : ""
                        }`}
                        onClick={() => setChoice(prev => ["qr", prev[1]])}
                    >
                        <ImQrcode />
                        <p>QR</p>
                    </div>

                    <div
                        className={`${styles.Icon} ${
                            choice[0] === "code" ? styles.Highlight : ""
                        }`}
                        onClick={() => setChoice(prev => ["code", prev[1]])}
                    >
                        <Bs123 />
                        <p>Secret Code</p>
                    </div>

                    <div
                        className={`${styles.Icon} ${
                            choice[0] === "selfi" ? styles.Highlight : ""
                        }`}
                        onClick={() => setChoice(prev => ["selfi", prev[1]])}
                    >
                        <FaCamera />
                        <p>Selfi</p>
                    </div>
                </div>

                <div className={`${styles.optionTwo} ${choice[0] ? styles.expand : ""}`}>
                    <div
                        className={`${styles.Icon} ${
                            choice[1] === "internet" ? styles.Highlight : ""
                        }`}
                        onClick={() => setChoice(prev => [prev[0], "internet"])}
                    >
                        <FaTowerCell />
                        <p>Record Attendance via Internet</p>
                    </div>

                    <div
                        className={`${styles.Icon} ${
                            choice[1] === "wifi" ? styles.Highlight : ""
                        }`}
                        onClick={() => setChoice(prev => [prev[0], "wifi"])}
                    >
                        <FaWifi />
                        <p>Record Attendance only through Wi-Fi</p>
                    </div>
                </div>

                {choice[0] && choice[1] && <div className={styles.Proceed} onClick={() => handleAttendance(choice)}>
                    Proceed
                </div>}

            </div>

            <div className={styles.EventDetails}>

                <div className={styles.Save} onClick={saveEvent}>
                    Save
                </div>

                <div className={styles.Delete}>
                    Delete
                </div>

                <div
                    className={styles.TakeAttendance}
                    onClick={() => setPopup(prev => !prev)}
                >
                    Take Attendance
                </div>

                <input
                    className={styles.Title}
                    placeholder="Event Title"
                    value={eventDetails.Title}
                    onChange={(e) =>
                        setEventDetails(prev => ({
                            ...prev,
                            Title: e.target.value
                        }))
                    }
                />

                <div className={styles.CreditsPlusDate}>

                    <input className={styles.Credits}
                        type="number"
                        placeholder="Credits"
                        value={eventDetails.Credits}
                        min={0}
                        max={50}
                        onChange={(e) =>
                            setEventDetails(prev => ({
                                ...prev,
                                Credits: e.target.value
                            }))
                        }
                    />

                    <input
                        type="date"
                        value={eventDetails.Date?.split("T")[0] || ""}
                        onChange={(e) =>
                            setEventDetails(prev => ({
                                ...prev,
                                Date: e.target.value
                            }))
                        }
                    />             
                </div>

                <div className={styles.Sessions}>

                    {eventDetails.Sessions.map((session, index) => (

                        <Session
                            key={index}
                            session={session}
                            index={index}
                            updateSession={updateSession}
                        />

                    ))}

                </div>

                <div
                    className={styles.NewSession}
                    onClick={addSession}
                >
                    Add Session
                </div>

                <label className={styles.EndTimeLabel} htmlFor="EndTime">Expected End Time </label>
                <input value={eventDetails.EndTime} 
                type="time" id="EndTime" className={styles.EndTime} 
                    onChange={(e) => setEventDetails((prev) => (
                        {...prev, EndTime:e.target.value}
                    ))}
                />

                <textarea className={styles.Description}
                    placeholder="Event Description"
                    value={eventDetails.Description}
                    onChange={(e) =>
                        setEventDetails(prev => ({
                            ...prev,
                            Description: e.target.value
                        }))
                    }
                />

            </div>

        </div>

    );

};

export default ManageEvent;