import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircledIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useTransition, animated } from 'react-spring'; // For smooth transition effects

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

  // Fetch sensor data from the backend
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

  // Handle transitions for the alerts
  const transitions = useTransition(alerts, {
    from: { opacity: 0, transform: 'translateY(-20px)' },
    enter: { opacity: 1, transform: 'translateY(0)' },
    leave: { opacity: 0, transform: 'translateY(20px)' },
  });

  return (
    <Card className="m-4 bg-white shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">Alerts</CardTitle>
        <CardDescription className="text-sm text-gray-500">Temperature and Humidity Alerts</CardDescription>
      </CardHeader>
      <CardContent>
        {alerts.length > 0 ? (
          transitions((style, alert, _, index) => (
            <animated.div key={index} style={style}>
              <div
                className={`border-l-4 p-4 mb-4 rounded-lg shadow-lg
                  ${alert.level === "high" ? "border-red-600 bg-red-100" : "border-green-600 bg-green-100"}`}
              >
                <div className="flex items-center">
                  {alert.level === "high" ? (
                    <ExclamationTriangleIcon className="w-6 h-6 text-red-600 mr-2" />
                  ) : (
                    <CheckCircledIcon className="w-6 h-6 text-green-600 mr-2" />
                  )}
                  <div>
                    <p className="font-medium">{alert.message}</p>
                    <p className="text-xs text-gray-500">{alert.time}</p>
                  </div>
                </div>
              </div>
            </animated.div>
          ))
        ) : (
          <p className="text-gray-600">No alerts. Temperature and humidity are within safe limits.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default Alerts;
