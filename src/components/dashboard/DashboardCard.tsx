
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const DashboardCard = ({ title, children, className }: DashboardCardProps) => {
  return (
    <div className={cn("bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-6", className)}>
      <h2 className="text-lg font-medium text-white mb-4">{title}</h2>
      {children}
    </div>
  );
};
