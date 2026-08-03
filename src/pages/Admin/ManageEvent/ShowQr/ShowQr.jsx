import { useEffect, useRef } from "react";
import QRCode from "qrcode";

function Attendance({ eventId }) {

    const canvasRef = useRef();

    useEffect(() => {

        const source = new EventSource(
            `${API_URL}/attendance/${eventId}/qr`
        );

        source.onmessage = async (event) => {

            const data = JSON.parse(event.data);

            await QRCode.toCanvas(
                canvasRef.current,
                JSON.stringify(data)
            );

        };

        return () => source.close();

    }, []);

    return <canvas ref={canvasRef}></canvas>;
}

export default Attendance;