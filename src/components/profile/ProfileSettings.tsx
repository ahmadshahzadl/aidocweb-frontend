import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Shield, Bell, Save } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { useAuth } from '../../hooks/useAuth';

export const ProfileSettings: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    dateOfBirth: user?.dateOfBirth || '',
    specialization: user?.specialization || ''
  });
  const [notifications, setNotifications] = useState({
    appointments: true,
    medication: true,
    results: false,
    marketing: false
  });

  const handleSave = () => {
    // Here you would typically make an API call to update the profile
    console.log('Saving profile:', formData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile & Settings</h1>
          <p className="text-gray-600">Manage your account information and preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
              <Button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                size="sm"
              >
                {isEditing ? (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                ) : (
                  'Edit Profile'
                )}
              </Button>
            </div>

            <div className="space-y-4">
              <Input
                label="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!isEditing}
                icon={<User className="w-5 h-5 text-gray-400" />}
              />

              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing}
                icon={<Mail className="w-5 h-5 text-gray-400" />}
              />

              <Input
                label="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!isEditing}
                icon={<Phone className="w-5 h-5 text-gray-400" />}
              />

              {user?.role === 'patient' ? (
                <>
                  <Input
                    label="Date of Birth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    disabled={!isEditing}
                    icon={<Calendar className="w-5 h-5 text-gray-400" />}
                  />
                  <Input
                    label="Address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    disabled={!isEditing}
                    icon={<MapPin className="w-5 h-5 text-gray-400" />}
                  />
                </>
              ) : (
                <Input
                  label="Specialization"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  disabled={!isEditing}
                  icon={<User className="w-5 h-5 text-gray-400" />}
                />
              )}
            </div>
          </Card>

          {/* Security Settings */}
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Security</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">Password</p>
                    <p className="text-sm text-gray-500">Last changed 30 days ago</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Change Password
                </Button>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500">Add an extra layer of security</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Enable 2FA
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Profile Card & Notifications */}
        <div className="space-y-6">
          {/* Profile Card */}
          <Card>
            <div className="text-center">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold text-gray-900">{user?.name}</h3>
              <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
              {user?.specialization && (
                <p className="text-sm text-blue-600 mt-1">{user.specialization}</p>
              )}
              <Button variant="ghost" size="sm" className="mt-4">
                Change Photo
              </Button>
            </div>
          </Card>

          {/* Notification Preferences */}
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h2>
            <div className="space-y-4">
              {[
                { key: 'appointments', label: 'Appointment Reminders', description: 'Get notified about upcoming appointments' },
                { key: 'medication', label: 'Medication Reminders', description: 'Never miss your medication schedule' },
                { key: 'results', label: 'Test Results', description: 'Get notified when results are available' },
                { key: 'marketing', label: 'Health Tips & News', description: 'Receive health-related updates' }
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Bell className="w-4 h-4 text-gray-400" />
                      <p className="font-medium text-gray-900">{item.label}</p>
                    </div>
                    <p className="text-sm text-gray-500 ml-6">{item.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications[item.key as keyof typeof notifications]}
                      onChange={(e) => handleNotificationChange(item.key, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};