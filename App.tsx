import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { WasteScanner } from './components/WasteScanner';
import { ScheduleCollection } from './components/ScheduleCollection';
import { Marketplace } from './components/Marketplace';
import { Rewards } from './components/Rewards';
import { Profile } from './components/Profile';
import { AdminDashboard } from './components/AdminDashboard';
import { Navigation } from './components/Navigation';
import { Auth } from './components/Auth';
import { Onboarding } from './components/Onboarding';
import { AppScreen } from './types';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.DASHBOARD);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false); 
  const [userRole, setUserRole] = useState<'admin' | 'user' | undefined>(undefined);

  const handleLogin = (user: any) => {
    setIsAuthenticated(true);
    setUserRole(user.role);
    setCurrentScreen(AppScreen.DASHBOARD); 
    setShowOnboarding(false); 
  };

  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  // Security Guard: Prevent non-admins from accessing Scanner
  if (currentScreen === AppScreen.SCANNER && userRole !== 'admin') {
      alert("Access Denied: Only company administrators can access the scanner.");
      setCurrentScreen(AppScreen.DASHBOARD);
      return null; // Force re-render
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case AppScreen.DASHBOARD:
        return <Dashboard onNavigate={setCurrentScreen} />;
      case AppScreen.SCANNER:
        return <WasteScanner />;
      case AppScreen.SCHEDULE:
        return <ScheduleCollection />;
      case AppScreen.MARKETPLACE:
        return <Marketplace />;
      case AppScreen.REWARDS:
        return <Rewards />;
      case AppScreen.PROFILE:
        return <Profile onBack={() => setCurrentScreen(AppScreen.DASHBOARD)} onNavigate={setCurrentScreen} userRole={userRole} />;
      case AppScreen.ADMIN_DASHBOARD:
        return <AdminDashboard onBack={() => setCurrentScreen(AppScreen.PROFILE)} />;
      default:
        return <Dashboard onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="h-full w-full bg-gray-50 flex justify-center font-sans text-gray-900">
      {/* Mobile container simulation for desktop view */}
      <div className="w-full max-w-md bg-white h-full relative shadow-2xl overflow-hidden flex flex-col">
        
        {showOnboarding && <Onboarding onComplete={() => setShowOnboarding(false)} />}

        <main className="flex-1 overflow-y-auto no-scrollbar relative">
          {renderScreen()}
        </main>
        {/* Hide bottom nav on Profile and Admin screens for a full-page feel */}
        {currentScreen !== AppScreen.PROFILE && currentScreen !== AppScreen.ADMIN_DASHBOARD && (
          <Navigation currentScreen={currentScreen} onNavigate={setCurrentScreen} userRole={userRole} />
        )}
      </div>
    </div>
  );
}