import "./App.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "./components/Navbar";
import DashboardCards from "./components/DashboardCards";
import Chart from "./components/Chart";
import Alerts from "./components/Alerts";
import { buttonVariants } from "@/components/ui/button";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="bg-background">
        <Navbar />
        <DashboardCards data={{
          aqi: 50,
          aqiChange: "+2.1% from last month",
          co: 167,
          coChange: "+2.1% from last month",
          pm25: 50,
          pm25Change: "+1.1% from last month",
          no2: 22,
          no2Change: "+9% from last month",
        }} />
        <div className="mx-8 mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4">
            <Chart />
          </div>
          <div className="col-span-3">
            <Alerts />
          </div>
        </div>
        <div className="m-8">
        <a
            href="https://www.airnow.gov/aqi/aqi-basics/"
            className="inline-flex items-center justify-center rounded-md bg-cyan-500 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
             target="_blank"
  >
            Check AQI Safe Levels
        </a>
        </div>
      </main>
      <Analytics />
    </ThemeProvider>
  );
}

export default App;
