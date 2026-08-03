import React, { useEffect, useState } from "react";
import styles from "./QrAttendance.module.css";
import { useParams } from "react-router-dom";
import QRCode from "qrcode";
import API_URL from "../../../../config";
import { waitFor } from "@testing-library/dom";

const QrAttendance = () => {
    const params = useParams();
    const event_id = params.eventId;
    const attendance_type = params.attendance_type;

    const [qrDetails, setQrDetails] = useState(null);
    const [qrImage, setQrImage] = useState("");
    const [ip, setIp] = useState(null);


    useEffect(() => {

        if (attendance_type === "lan")
        {async function getIp () {
            const res = await fetch (`http://localhost:3501/ip`);
            return await res.text();
        }

        async function uploadIp(ip) {
            const res = await fetch(`${API_URL}/setip/${event_id}`, {
                method:"POST",
                credentials:"include",
                headers:{
                    "Content-Type":"text/plain"
                },
                body:ip
            });
        }

        async function intIp() {
            const ip = await getIp();
            setIp(ip);
            await uploadIp(ip);
        }
        
        intIp();}

        else {
            
        }

        const ws = new WebSocket(`ws://localhost:3500/${event_id}/qrstream`);

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

        return () => ws.close();
    }, [event_id]);

    useEffect(() => {console.log (ip)}, [ip])

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