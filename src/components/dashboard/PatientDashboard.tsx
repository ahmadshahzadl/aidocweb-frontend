import React from 'react';
import { 
  Calendar, 
  Pill, 
  Activity, 
  Clock,
  Heart,
  Droplets,
  Weight,
  TrendingUp
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { appointments, healthMetrics, medications, notifications } from '../../data/mockData';
import { useAuth } from '../../hooks/useAuth';

interface PatientDashboardProps {
  onTabChange: (tab: string) => void;
}

export const PatientDashboard: React.FC<PatientDashboardProps> = ({ onTabChange }) => {
  const { user } = useAuth();
  
  const upcomingAppointments = appointments.filter(apt => 
    apt.patientId === user?.id && apt.status === 'scheduled'
  ).slice(0, 3);

  const todayMedications = medications.filter(med => !med.taken);
  const unreadNotifications = notifications.filter(notif => !notif.read);

  const getMetricIcon = (type: string) => {
    switch (type) {
      case 'heart_rate': return <Heart className="w-5 h-5 text-red-500" />;
      case 'blood_pressure': return <Activity className="w-5 h-5 text-blue-500" />;
      case 'glucose': return <Droplets className="w-5 h-5 text-yellow-500" />;
      case 'weight': return <Weight className="w-5 h-5 text-green-500" />;
      default: return <TrendingUp className="w-5 h-5 text-gray-500" />;
    }
  };

  const formatMetricValue = (metric: any) => {
    if (metric.type === 'blood_pressure') {
      return `${metric.systolic}/${metric.diastolic} ${metric.unit}`;
    }
    return `${metric.value} ${metric.unit}`;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white p-6">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-blue-100">Here's your health overview for today</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="text-center">
          <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900">{upcomingAppointments.length}</h3>
          <p className="text-sm text-gray-600">Upcoming Appointments</p>
        </Card>
        
        <Card className="text-center">
          <Pill className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900">{todayMedications.length}</h3>
          <p className="text-sm text-gray-600">Medications Due</p>
        </Card>
        
        <Card className="text-center">
          <Activity className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900">{healthMetrics.length}</h3>
          <p className="text-sm text-gray-600">Tracked Metrics</p>
        </Card>
        
        <Card className="text-center">
          <Clock className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900">{unreadNotifications.length}</h3>
          <p className="text-sm text-gray-600">New Notifications</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onTabChange('appointments')}
            >
              View All
            </Button>
          </div>
          
          <div className="space-y-3">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{appointment.doctorName}</p>
                  <p className="text-sm text-gray-600">{appointment.reason}</p>
                  <p className="text-xs text-gray-500">{appointment.date} at {appointment.time}</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {appointment.type}
                  </span>
                </div>
              </div>
            ))}
            
            {upcomingAppointments.length === 0 && (
              <p className="text-gray-500 text-center py-4">No upcoming appointments</p>
            )}
          </div>
        </Card>

        {/* Today's Medications */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Today's Medications</h2>
            <Button 
              variant="ghost" 
              size="sm"
            >
              View All
            </Button>
          </div>
          
          <div className="space-y-3">
            {todayMedications.map((medication) => (
              <div key={medication.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{medication.name}</p>
                  <p className="text-sm text-gray-600">{medication.dosage} - {medication.frequency}</p>
                  <p className="text-xs text-gray-500">Next dose: {new Date(medication.nextDose).toLocaleTimeString()}</p>
                </div>
                <Button size="sm" variant="primary">
                  Mark Taken
                </Button>
              </div>
            ))}
            
            {todayMedications.length === 0 && (
              <p className="text-gray-500 text-center py-4">All medications taken for today!</p>
            )}
          </div>
        </Card>
      </div>

      {/* Health Metrics */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Health Metrics</h2>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onTabChange('analytics')}
          >
            View Analytics
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {healthMetrics.map((metric) => (
            <div key={metric.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                {getMetricIcon(metric.type)}
                <h3 className="font-medium text-gray-900 capitalize">
                  {metric.type.replace('_', ' ')}
                </h3>
              </div>
              <p className="text-xl font-bold text-gray-900">{formatMetricValue(metric)}</p>
              <p className="text-xs text-gray-500">{metric.date}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};