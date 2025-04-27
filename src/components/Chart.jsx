import { LineChart } from "@tremor/react";

// Sample data - replace this with actual data from the DHT22 sensor.
const data = [
  { name: "Day 1", temperature: 24.5, humidity: 60, date: "24-02-24" },
  { name: "Day 2", temperature: 23.8, humidity: 62, date: "25-02-24" },
  { name: "Day 3", temperature: 25.1, humidity: 59, date: "26-02-24" },
  { name: "Day 4", temperature: 26.3, humidity: 58, date: "27-02-24" },
  { name: "Day 5", temperature: 27.0, humidity: 57, date: "28-02-24" },
  { name: "Day 6", temperature: 28.2, humidity: 55, date: "29-02-24" },
  { name: "Day 7", temperature: 29.1, humidity: 54, date: "01-03-24" },
];

export default function Chart() {
  return (
    <div className="p-6 bg-gray-900 rounded-xl shadow-md">
      <div className="mb-6">
        <h2 className="text-3xl font-semibold text-white mb-4">Temperature & Humidity Trends</h2>
        <p className="text-lg text-gray-400 opacity-80">
          Visualize temperature and humidity trends over the past week.
        </p>
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
      />

      <div className="mt-6 text-center text-white text-sm">
        <p className="opacity-70">Data sourced from real-time sensor readings.</p>
      </div>
    </div>
  );
}
