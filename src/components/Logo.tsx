import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import logoMark from "@/assets/Logomark.svg";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <Link to="/" className={`flex items-center gap-2 group ${className}`}>
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/30">
        <img
            src={logoMark}
            alt="Healthcare professionals"
            className="side-img h-full w-full  object-center"
          />
      </div>
      <span className="text-[24px] font-bold text-foreground">CarePulse</span>
    </Link>
  );
};

export default Logo;
