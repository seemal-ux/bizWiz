
import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const StatCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend,
  trendValue,
  className,
  style
}: StatCardProps) => {
  return (
    <div 
      className={cn("bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 shadow-lg hover:shadow-xl transition-all duration-300", className)}
      style={style}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-auth-muted text-sm">{title}</p>
          <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
          {description && <p className="text-sm text-auth-muted mt-1">{description}</p>}
          
          {trend && trendValue && (
            <div className="mt-2 flex items-center">
              <span className={cn(
                "text-xs font-medium flex items-center space-x-1",
                trend === "up" && "text-green-400",
                trend === "down" && "text-red-400",
                trend === "neutral" && "text-auth-muted"
              )}>
                {trend === "up" && "▲ "}
                {trend === "down" && "▼ "}
                {trendValue}
              </span>
            </div>
          )}
        </div>
        
        {Icon && (
          <div className="bg-auth-accent/10 p-3 rounded-xl">
            <Icon className="h-5 w-5 text-auth-accent" />
          </div>
        )}
      </div>
    </div>
  );
};
