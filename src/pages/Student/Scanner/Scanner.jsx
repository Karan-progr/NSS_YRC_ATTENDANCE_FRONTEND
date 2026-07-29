import React from 'react'
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";
import './Scanner.css'

function Scanner() {
  const navigate = useNavigate();

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
      (decodedText) => {
        scanner.clear();

        navigate("/attendance", {
          state: { token: decodedText },
        });
      },
      () => {}
    );

    return () => scanner.clear().catch(() => {});
  }, [navigate]);

  return <div className="body"><div id="reader"></div></div>;
}

export default Scanner