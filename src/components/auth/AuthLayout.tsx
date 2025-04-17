
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-500 via-dark-400 to-dark-300 relative overflow-hidden">
      {/* Animated background patterns */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cmVjdCBmaWxsPSIjMUExRjJDIiB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjgiLz48cGF0aCBkPSJNNTk4LjMxMSAzODRjMTEyLjMxMyAwIDIwMy4zMTEtOTAuOTk4IDIwMy4zMTEtMjAzLjMxMVM3MTAuNjI0LTIyLjYyMiA1OTguMzExLTIyLjYyMiAzOTUgNjguMzc2IDM5NSAxODAuNjg5IDQ4NS45OTggMzg0IDU5OC4zMTEgMzg0em0yNDMuMzczIDQ0LjYyMmMxMTIuMzEzIDAgMjAzLjMxMS05MC45OTggMjAzLjMxMS0yMDMuMzExUzk1My45OTcgMjIgODQxLjY4NCAyMiA2MzguMzczIDExMi45OTggNjM4LjM3MyAyMjUuMzExIDcyOS4zNzEgNDI4LjYyMiA4NDEuNjg0IDQyOC42MjJ6IiBmaWxsPSIjMjIxRjI2IiBvcGFjaXR5PSIuNSIvPjwvZz48L3N2Zz4=')] opacity-30 mix-blend-overlay pointer-events-none animate-pulse"></div>
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-[10%] left-[10%] w-64 h-64 bg-auth-accent/20 rounded-full blur-3xl animate-pulse opacity-30 mix-blend-overlay"></div>
      <div className="absolute bottom-[20%] right-[5%] w-96 h-96 bg-burgundy/20 rounded-full blur-3xl opacity-20 animate-pulse" style={{animationDelay: "1.5s"}}></div>
      
      <header className="fixed top-0 w-full px-6 py-6 z-10">
        <div className="max-w-7xl mx-auto flex justify-between">
          <div className="flex items-center space-x-2 animate-fade-in">
            <div className="h-8 w-8 bg-gradient-to-br from-auth-accent to-auth-highlight rounded-md transform hover:scale-105 transition-transform duration-300"></div>
            <span className="font-display font-bold text-white text-xl">BizWiz</span>
          </div>
          <nav className="animate-fade-in" style={{animationDelay: "0.2s"}}>
            <ul className="flex space-x-6">
              <li className="transform hover:-translate-y-1 transition-transform duration-300">
                <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Home</a>
              </li>
              <li className="transform hover:-translate-y-1 transition-transform duration-300">
                <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Features</a>
              </li>
              <li className="transform hover:-translate-y-1 transition-transform duration-300">
                <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="min-h-screen flex items-center justify-center p-6 relative z-10">
        <div className="auth-glass p-8 sm:p-12 w-full max-w-md transform transition-all duration-500 animate-fade-in hover:shadow-xl">
          {children}
        </div>
      </main>
      
      <footer className="px-6 py-4 text-center relative z-10 animate-fade-in" style={{animationDelay: "1s"}}>
        <p className="text-sm text-auth-muted">&copy; 2025 BizWiz. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AuthLayout;

