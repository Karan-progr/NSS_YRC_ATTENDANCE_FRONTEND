import React, { useEffect, useState } from "react";
import styles from "./QrAttendance.module.css";
import { useParams } from "react-router-dom";
import QRCode from "qrcode";
import API_URL from "../../../../config";
import { waitFor } from "@testing-library/dom";

const QrAttendance = () => {
    const params = useParams();
    const event_id = params.eventId;
    const attendanceType = params.attendance_type1;
    const modeOfAttendance = params.attendance_type2;

    const [qrDetails, setQrDetails] = useState(null);
    const [qrImage, setQrImage] = useState("");
    const [url, seturl] = useState(null);

    async function getip () {
            const res = await fetch (`http://localhost:3501/url`);
            return await res.text();
    }

    async function uploadurl(url) {
        const res = await fetch(`${API_URL}/seturl/${event_id}`, {
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"text/plain"
            },
            body:url
        });
        console.log (url);
    }


    useEffect(() => {

        if (modeOfAttendance === "lan"){

            async function inturl() {
                const ip = await getip();
                seturl(`http://${ip}:3051/submit`);
                await uploadurl(url);
            }
            
            inturl();
        }

        else {
            uploadurl (`${API_URL}/submit-attendance`);
        }
        if (attendanceType === "qr")
        {const ws = new WebSocket(`ws://localhost:3500/${event_id}/qrstream`);

        ws.onopen = () => {
            console.log("Connected to server");
        };

        ws.onmessage = async (message) => {
            const details = JSON.parse(message.data);
            setQrDetails(details);

            try {
                const url = await QRCode.toDataURL(details.token, {scale: 10});
                setQrImage(url);
            } catch (err) {
                console.error("QR generation failed", err);
            }
        };

        return () => ws.close();}
        else if(attendanceType === "code") {
            //logic for code based attendance
        }
    }, [event_id]);

    useEffect(() => {console.log (url)}, [url])

    return (
        <div className={styles.QrAttendance}>
            <div className={styles.QrCode}>
                {qrImage && (
                    <img
                        src={qrImage}
                        alt="Attendance QR"
                        width={300}
                        height={300}
                    />
                )}
            </div>
        </div>
    );
};

export default QrAttendance;