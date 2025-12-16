import { cn } from "@/lib/utils";
import { CalendarCheck, Hourglass, Ban } from "lucide-react";
import type { Status } from "@/lib/constants";

interface StatusBadgeProps {
  status: Status;
}

const statusConfig = {
  scheduled: {
    label: "Scheduled",
    className: "status-scheduled",
    icon: CalendarCheck,
    iconColor: "text-[#24AE7C]",
  },
  pending: {
    label: "Pending",
    className: "status-pending",
    icon: Hourglass,
    iconColor: "text-[#79B5EC]",
  },
  cancelled: {
    label: "Cancelled",
    className: "status-cancelled",
    icon: Ban,
    iconColor: "text-[#F37877]",
  },
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={cn("status-badge w-fit", config.className)}>
      <Icon className={cn("h-5 w-5", config.iconColor)} />
      <span>{config.label}</span>
    </div>
  );
};

export default StatusBadge;
