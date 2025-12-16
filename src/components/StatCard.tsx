import { cn } from "@/lib/utils";
import { CalendarCheck, Hourglass, AlertTriangle } from "lucide-react";

interface StatCardProps {
  count: number;
  label: string;
  type: "scheduled" | "pending" | "cancelled";
}

const iconMap = {
  scheduled: CalendarCheck,
  pending: Hourglass,
  cancelled: AlertTriangle,
};

const bgImageMap = {
  scheduled: "linear-gradient(135deg, rgba(255, 211, 78, 0.15) 0%, rgba(255, 211, 78, 0.05) 100%)",
  pending: "linear-gradient(135deg, rgba(121, 181, 236, 0.15) 0%, rgba(121, 181, 236, 0.05) 100%)",
  cancelled: "linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.05) 100%)",
};

const iconColorMap = {
  scheduled: "text-[#FFD34E]",
  pending: "text-[#79B5EC]",
  cancelled: "text-[#F37877]",
};

const StatCard = ({ count, label, type }: StatCardProps) => {
  const Icon = iconMap[type];

  return (
    <div 
      className="stat-card flex flex-col gap-5 rounded-2xl p-6 border border-dark-500"
      style={{ background: bgImageMap[type] }}
    >
      
      <div className="flex items-center gap-4">
        <Icon className={cn("h-8 w-8", iconColorMap[type])} />
        <h2 className="text-[32px] font-bold text-foreground leading-none">{count}</h2>
      </div>
      <p className="text-[14px] text-dark-700">{label}</p>
    </div>
  );
};

export default StatCard;
