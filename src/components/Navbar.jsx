import { CalendarIcon } from "@radix-ui/react-icons";
import { ModeToggle } from "./ModeToggle";

const Navbar = () => {
  const d = new Date();
  const time = d.toLocaleDateString();

  return (
    <nav className="bg-background/80 backdrop-blur-lg border-b border-border flex justify-between items-center w-full px-6 py-4 shadow-lg">
      <h1 className="text-2xl md:text-3xl font-bold text-cyan-400 tracking-wide drop-shadow-md">
        Air Quality Monitor
      </h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center bg-muted/30 border border-border rounded-md px-4 py-2 text-sm text-muted-foreground shadow-inner backdrop-blur-sm">
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span>{time}</span>
        </div>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
