
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const DashboardCard = ({ title, children, className, style }: DashboardCardProps) => {
  return (
    <div 
      className={cn("bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 shadow-lg transition-all duration-300", className)}
      style={style}
    >
      <h2 className="text-lg font-medium text-white mb-4">{title}</h2>
      {children}
    </div>
  );
};
