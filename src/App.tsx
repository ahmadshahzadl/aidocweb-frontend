import React, { useState } from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { Sidebar } from './components/navigation/Sidebar';
import { TopNav } from './components/navigation/TopNav';
import { PatientDashboard } from './components/dashboard/PatientDashboard';
import { DoctorDashboard } from './components/dashboard/DoctorDashboard';
import { Appointments } from './components/appointments/Appointments';
import { Analytics } from './components/analytics/Analytics';
import { Messages } from './components/messages/Messages';
import { NotificationList } from './components/notifications/NotificationList';
import { ProfileSettings } from './components/profile/ProfileSettings';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return authMode === 'login' ? (
      <Login onToggleRegister={() => setAuthMode('register')} />
    ) : (
      <Register onToggleLogin={() => setAuthMode('login')} />
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return user.role === 'patient' ? (
          <PatientDashboard onTabChange={setActiveTab} />
        ) : (
          <DoctorDashboard onTabChange={setActiveTab} />
        );
      case 'appointments':
        return <Appointments />;
      case 'analytics':
        return <Analytics />;
      case 'messages':
        return <Messages />;
      case 'notifications':
        return <NotificationList />;
      case 'profile':
        return <ProfileSettings />;
      default:
        return user.role === 'patient' ? (
          <PatientDashboard onTabChange={setActiveTab} />
        ) : (
          <DoctorDashboard onTabChange={setActiveTab} />
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* Mobile Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isMobile
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;