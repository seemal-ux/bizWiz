
import React from "react";
import { Clock } from "lucide-react";

interface WelcomeBannerProps {
  userName: string;
}

export const WelcomeBanner = ({ userName }: WelcomeBannerProps) => {
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 p-8 mb-6">
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Welcome back, {userName}!</h1>
            <p className="mt-2 text-purple-100">Here's what's happening with your projects today.</p>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
            <Clock className="h-5 w-5 text-purple-100" />
            <span className="text-purple-100 font-medium">
              {currentTime.toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-transparent mix-blend-overlay"></div>
    </div>
  );
};
