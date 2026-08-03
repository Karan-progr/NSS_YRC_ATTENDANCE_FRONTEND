import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";
import './Scanner.css'
import API_URL from '../../../config';

function Scanner() {
  const navigate = useNavigate();
  const ip = localStorage.getItem("ip");
  console.log (ip);

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

            await fetch(`http://${ip}/submit-attendance`, {
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