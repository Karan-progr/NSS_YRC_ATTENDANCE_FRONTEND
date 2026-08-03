import React, { useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";
import './Scanner.css'
import API_URL from '../../../config';

function Scanner() {
  const navigate = useNavigate();

  params = useParams();
  const event_id = params.event_id;
  
  const [attendanceUrl, setAttendanceUrl] = useState(null);
  
  useEffect(() => {
    async function getAttendanceUrl() {
      const res = fetch(`${API_URL}/${event_id}get-attendance-url`, 
        {
          credentials:"include"
        }
      );

      const data = await res.text();
      setAttendanceUrl(data);

    }
  }, [])

  const params = useParams();

  const attendance_type = params.attendance_type;
  console.log (attendance_type);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 30,
        qrbox: { width: 250, height: 250 },
      },
      false
    );

    scanner.render(
        async (decodedText) => {

            scanner.clear();

            const qrData = JSON.parse(decodedText);

            await fetch(`${attendanceUrl}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                  token:qrData,
                })
            });

            

        },
        () => {}
    );

    return () => scanner.clear().catch(() => {});
  }, [navigate]);

  return <div className="body"><div id="reader"></div></div>;
}

export default Scanner