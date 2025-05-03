import { useState, useEffect } from "react";
import { LineChart } from "@tremor/react";

// Helper function to format date in the desired format
const formatDate = (date) => {
  return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear().toString().slice(-2)}`;
};

// Helper function to get data for different ranges
const getDataForRange = (range) => {
  const today = new Date();
  let startDate = new Date();

  // Adjust startDate based on the selected range
  switch (range) {
    case "today":
      startDate = today;
      break;
    case "last3":
      startDate.setDate(today.getDate() - 3);
      break;
    case "last7":
      startDate.setDate(today.getDate() - 7);
      break;
    case "last14":
      startDate.setDate(today.getDate() - 14);
      break;
    default:
      startDate = today;
      break;
  }

  const daysRange = [];
  const daysCount = range === "today" ? 1 : range === "last3" ? 3 : range === "last7" ? 7 : 14;

  for (let i = daysCount - 1; i >= 0; i--) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const formattedDate = formatDate(date);
    daysRange.push({
      name: `Day ${daysCount - i}`,
      temperature: 20 + Math.random() * 10, // Simulated temperature data
      humidity: 50 + Math.random() * 10, // Simulated humidity data
      date: formattedDate,
    });
  }

  return daysRange;
};

export default function Chart() {
  const [data, setData] = useState([]);
  const [selectedRange, setSelectedRange] = useState("last7");

  useEffect(() => {
    // Fetch data based on the selected range
    const rangeData = getDataForRange(selectedRange);
    setData(rangeData);
  }, [selectedRange]);

  return (
    <div className="p-6 bg-gray-900 rounded-xl shadow-md">
      <div className="mb-6">
        <h2 className="text-3xl font-semibold text-white mb-4">Temperature & Humidity Trends</h2>
        <p className="text-lg text-gray-400 opacity-80">
          Visualize temperature and humidity trends based on your selected date range.
        </p>
        {/* Dropdown for selecting the date range */}
        <div className="mt-4">
          <select
            className="p-2 bg-gray-700 text-white rounded-lg"
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value)}
          >
            <option value="today">Today</option>
            <option value="last3">Last 3 Days</option>
            <option value="last7">Last 7 Days</option>
            <option value="last14">Last 2 Weeks</option>
          </select>
        </div>
      </div>

      <LineChart
        className="border-2 border-gray-600 rounded-xl bg-gray-800 p-6 shadow-sm"
        data={data}
        index="date"
        categories={["temperature", "humidity"]}
        colors={["indigo", "green"]}
        curveType="monotone"
        showAnimation
        onValueChange={(v) => console.log(v)}
        tooltip
      />

      <div className="mt-6 text-center text-white text-sm">
        <p className="opacity-70">Data sourced from real-time sensor readings.</p>
      </div>
    </div>
  );
}
