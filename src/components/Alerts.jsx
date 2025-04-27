import axios from "axios";
import React, { useState, useEffect } from "react"; // Import React explicitly
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircledIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";

// Define the threshold limits
const temperatureThresholds = {
  high: 30,  // Above 30°C
  low: 10,   // Below 10°C
};

const humidityThresholds = {
  high: 90,  // Above 90%
  low: 20,   // Below 20%
};

const Alerts = () => {
  const [sensorData, setSensorData] = useState({
    temperature: null,
    humidity: null,
  });
  const [alerts, setAlerts] = useState([]);

  // Fetch sensor data from the backend (you can replace this with your actual endpoint)
  useEffect(() => {
    axios.get('/api/sensor-data')  // Ensure this URL is correct for your setup
      .then((response) => {
        const { temperature, humidity } = response.data;

        // Update state with real-time data
        setSensorData({ temperature, humidity });

        const newAlerts = [];

        // Check if temperature exceeds thresholds
        if (temperature > temperatureThresholds.high) {
          newAlerts.push({
            time: "Real-time",
            message: `Temperature exceeds safe limit: ${temperature}°C`,
            level: "high",
          });
        } else if (temperature < temperatureThresholds.low) {
          newAlerts.push({
            time: "Real-time",
            message: `Temperature is too low: ${temperature}°C`,
            level: "low",
          });
        }

        // Check if humidity exceeds thresholds
        if (humidity > humidityThresholds.high) {
          newAlerts.push({
            time: "Real-time",
            message: `Humidity exceeds safe limit: ${humidity}%`,
            level: "high",
          });
        } else if (humidity < humidityThresholds.low) {
          newAlerts.push({
            time: "Real-time",
            message: `Humidity is too low: ${humidity}%`,
            level: "low",
          });
        }

        // Set the alerts
        setAlerts(newAlerts);

        // Optionally send an email alert if an issue is found
        if (newAlerts.length > 0) {
          axios.post('/api/send-alert', { alerts: newAlerts })
            .then((response) => {
              console.log("Email alert sent:", response.data);
            })
            .catch((error) => {
              console.error("Error sending email alert:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching sensor data:", error);
      });
  }, []); // Empty dependency array to fetch data only on component mount

  return (
    <Card className="m-4">
      <CardHeader>
        <CardTitle>Alerts</CardTitle>
        <CardDescription>Temperature and Humidity Alerts</CardDescription>
      </CardHeader>
      {alerts.length > 0 ? (
        alerts.map((alert, index) => (
          <CardContent key={index}>
            <div
              className={`border-l-4 p-2 ${
                alert.level === "high" ? "border-l-red-600 bg-secondary" : "border-l-green-600 bg-success"
              }`}
            >
              <p>{alert.time}</p>
              <p className="font-medium">{alert.message}</p>
            </div>
          </CardContent>
        ))
      ) : (
        <CardContent>
          <p>No alerts. Temperature and humidity are within safe limits.</p>
        </CardContent>
      )}
    </Card>
  );
};

export default Alerts;
