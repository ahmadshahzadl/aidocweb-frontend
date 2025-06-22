import React from 'react';
import { 
  Home, 
  Calendar, 
  BarChart3, 
  MessageSquare, 
  User, 
  Bell,
  LogOut,
  Heart
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  onTabChange, 
  isMobile = false,
  isOpen = true,
  onClose 
}) => {
  const { user, logout } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const handleItemClick = (itemId: string) => {
    onTabChange(itemId);
    if (isMobile && onClose) {
      onClose();
    }
  };

  if (isMobile && !isOpen) return null;

  return (
    <>
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <div className={`
        ${isMobile ? 'fixed left-0 top-0 z-50' : 'relative'}
        w-64 h-screen bg-white border-r border-gray-200 flex flex-col
        ${isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0'}
        transition-transform duration-300 ease-in-out
      `}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Heart className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">HealthCare</h1>
              <p className="text-sm text-gray-500 capitalize">{user?.role} Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`
                  w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left
                  transition-colors duration-200
                  ${activeTab === item.id
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.email}
              </p>
            </div>
          </div>
          
          <button
            onClick={logout}
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
};