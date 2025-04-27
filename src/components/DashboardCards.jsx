import { ThermometerIcon, DropletIcon, CloudSunIcon, GaugeIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const tempData = [
  { value: 27 }, { value: 28 }, { value: 28.5 }, { value: 29 }, { value: 28 }, { value: 27.5 }
];

const humidityData = [
  { value: 58 }, { value: 60 }, { value: 59 }, { value: 61 }, { value: 60 }, { value: 59.5 }
];

const DashboardCards = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 px-8 mt-8">
      
      {/* Temperature Card */}
      <Card className="bg-background/60 backdrop-blur-md border border-border shadow-lg rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-semibold text-cyan-400">Temperature</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <ThermometerIcon className="text-cyan-400" size={20} />
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Measured in °C</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-3xl font-bold text-primary">28°C</div>
          <ResponsiveContainer width="100%" height={50}>
            <LineChart data={tempData}>
              <Line type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-muted-foreground">Stable</p>
        </CardContent>
      </Card>

      {/* Humidity Card */}
      <Card className="bg-background/60 backdrop-blur-md border border-border shadow-lg rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-semibold text-cyan-400">Humidity</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropletIcon className="text-cyan-400" size={20} />
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Measured in %</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-3xl font-bold text-primary">60%</div>
          <ResponsiveContainer width="100%" height={50}>
            <LineChart data={humidityData}>
              <Line type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-muted-foreground">Comfortable</p>
        </CardContent>
      </Card>

      {/* Weather Card */}
      <Card className="bg-background/60 backdrop-blur-md border border-border shadow-lg rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-semibold text-cyan-400">Weather</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <CloudSunIcon className="text-cyan-400" size={20} />
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>External Data</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-2xl font-bold text-primary">Sunny 32°C</div>
          <p className="text-xs text-muted-foreground">Karachi, Pakistan</p>
        </CardContent>
      </Card>

      {/* Air Pressure Card */}
      <Card className="bg-background/60 backdrop-blur-md border border-border shadow-lg rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-semibold text-cyan-400">Air Pressure</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <GaugeIcon className="text-cyan-400" size={20} />
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Measured in hPa</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-3xl font-bold text-primary">1013 hPa</div>
          <p className="text-xs text-muted-foreground">Normal Pressure</p>
        </CardContent>
      </Card>

    </div>
  );
};

export default DashboardCards;
