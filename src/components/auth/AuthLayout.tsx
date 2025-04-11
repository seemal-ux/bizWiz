
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-500 via-dark-400 to-dark-300">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cmVjdCBmaWxsPSIjMUExRjJDIiB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjgiLz48cGF0aCBkPSJNNTk4LjMxMSAzODRjMTEyLjMxMyAwIDIwMy4zMTEtOTAuOTk4IDIwMy4zMTEtMjAzLjMxMVM3MTAuNjI0LTIyLjYyMiA1OTguMzExLTIyLjYyMiAzOTUgNjguMzc2IDM5NSAxODAuNjg5IDQ4NS45OTggMzg0IDU5OC4zMTEgMzg0em0yNDMuMzczIDQ0LjYyMmMxMTIuMzEzIDAgMjAzLjMxMS05MC45OTggMjAzLjMxMS0yMDMuMzExUzk1My45OTcgMjIgODQxLjY4NCAyMiA2MzguMzczIDExMi45OTggNjM4LjM3MyAyMjUuMzExIDcyOS4zNzEgNDI4LjYyMiA4NDEuNjg0IDQyOC42MjJ6IiBmaWxsPSIjMjIxRjI2IiBvcGFjaXR5PSIuNSIvPjwvZz48L3N2Zz4=')] opacity-30 mix-blend-overlay pointer-events-none"></div>
      
      <header className="fixed top-0 w-full px-6 py-6">
        <div className="max-w-7xl mx-auto flex justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gradient-to-br from-auth-accent to-auth-highlight rounded-md"></div>
            <span className="font-display font-bold text-white text-xl">Auth.io</span>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#" className="text-sm text-gray-300 hover:text-white">Home</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white">Features</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="auth-glass p-8 sm:p-12 w-full max-w-md">
          {children}
        </div>
      </main>
      
      <footer className="px-6 py-4 text-center">
        <p className="text-sm text-auth-muted">&copy; 2025 Auth.io. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AuthLayout;
