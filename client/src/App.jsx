import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [algoRudder, setAlgoRudder] = useState("N/A");
  const [algoSail, setAlgoSail] = useState("N/A");
  const [controlMode, setControlMode] = useState("N/A");
  const [radioRudder, setRadioRudder] = useState("N/A");
  const [radioSail, setRadioSail] = useState("N/A");
  const [rudderAngle, setRudderAngle] = useState("N/A");
  const [sailTopic, setSailTopic] = useState("N/A");
  const [gps, setGps] = useState("N/A");
  const [imu, setImu] = useState("N/A");
  const [actualRudderAngle, setActualRudderAngle] = useState("N/A");
  const [actualSailAngle, setActualSailAngle] = useState("N/A");
  const [waypointService, setWaypointService] = useState("N/A");

  useEffect(() => {
    // Connect to ROS when the component mounts
    const ros = new window.ROSLIB.Ros({
        url: "ws://localhost:9090" // Replace with actual ROS bridge URL
    });

    ros.on("connection", () => console.log("Connected to ROS"));
    ros.on("error", (error) => console.error("Error connecting to ROS:", error));
    ros.on("close", () => console.log("Disconnected from ROS"));

    // Subscribe to /sailbot/algo_rudder topic
    const algoRudder = new window.ROSLIB.Topic({
        ros: ros,
        name: "/sailbot/algo_rudder",
        messageType: "std_msgs/Int32"
    });

    algoRudderTopic.subscribe((message) => {
        setAlgoRudder(message.data); // Update React state
    });

    // Subscribe to /sailbot/algo_sail
    const algoSail = new ROSLIB.Topic({
        ros: ros,
        name: '/sailbot/algo_sail',
        messageType: 'std_msgs/Int32'
    });
    algoSailTopic.subscribe(function (message) {
        setAlgoSail('algo-sail-value', message.data);
    });

    return () => {
        algoRudderTopic.unsubscribe(); // Cleanup when unmounting
    };
  }, []);

  return (
    <div>
      <h1>Sailbot Status Dashboard</h1>

      <div className="status-row">
          <span className="status-label">Algo Rudder:</span>
          <span className="status-value">{algoRudder}</span>
      </div>
    </div>
  );
}

export default App