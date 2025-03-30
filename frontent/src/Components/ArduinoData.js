import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Connect to backend

const ArduinoData = () => {
    const [data, setData] = useState("");

    useEffect(() => {
        socket.on("arduinoData", (receivedData) => {
            setData(receivedData);
        });

        return () => socket.off("arduinoData");
    }, []);

    const sendCommand = () => {
        socket.emit("sendToArduino", "LED_ON"); // Example command
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">Arduino Data: {data}</h1>
            <button onClick={sendCommand} className="mt-2 p-2 bg-blue-500 text-white">
                Send Command
            </button>
        </div>
    );
};

export default ArduinoData;
