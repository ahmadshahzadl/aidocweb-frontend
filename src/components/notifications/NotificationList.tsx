import React, { useState } from 'react';
import { Bell, Clock, Calendar, AlertTriangle, Check, X } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { notifications as initialNotifications } from '../../data/mockData';

export const NotificationList: React.FC = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<'all' | 'unread' | 'medication' | 'appointment'>('all');

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'medication': return <Clock className="w-5 h-5 text-blue-500" />;
      case 'appointment': return <Calendar className="w-5 h-5 text-green-500" />;
      case 'alert': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default: return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-blue-500';
      default: return 'border-l-gray-300';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">Stay updated with your healthcare reminders</p>
        </div>
        
        <Button onClick={markAllAsRead} variant="ghost" size="sm">
          <Check className="w-4 h-4 mr-2" />
          Mark all as read
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {[
          { value: 'all', label: 'All' },
          { value: 'unread', label: 'Unread' },
          { value: 'medication', label: 'Medication' },
          { value: 'appointment', label: 'Appointments' }
        ].map(tab => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value as any)}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
              filter === tab.value
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.map((notification) => (
          <Card 
            key={notification.id} 
            className={`border-l-4 ${getPriorityColor(notification.priority)} ${
              !notification.read ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className={`text-sm font-medium ${
                      !notification.read ? 'text-gray-900' : 'text-gray-700'
                    }`}>
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">
                    {notification.message}
                  </p>
                  
                  <p className="text-xs text-gray-500">
                    {formatTime(notification.timestamp)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-1 ml-4">
                {!notification.read && (
                  <Button
                    onClick={() => markAsRead(notification.id)}
                    variant="ghost"
                    size="sm"
                  >
                    <Check className="w-4 h-4" />
                  </Button>
                )}
                <Button
                  onClick={() => deleteNotification(notification.id)}
                  variant="ghost"
                  size="sm"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {filteredNotifications.length === 0 && (
          <Card>
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-500">
                {filter === 'all' 
                  ? "You're all caught up! No notifications to show."
                  : `No ${filter} notifications to show.`
                }
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};