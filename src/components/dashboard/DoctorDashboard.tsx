import React from 'react';
import { 
  Calendar, 
  Users, 
  Clock, 
  MessageSquare,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { appointments } from '../../data/mockData';
import { useAuth } from '../../hooks/useAuth';

interface DoctorDashboardProps {
  onTabChange: (tab: string) => void;
}

export const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ onTabChange }) => {
  const { user } = useAuth();
  
  const todayAppointments = appointments.filter(apt => 
    apt.doctorId === user?.id && 
    apt.date === new Date().toISOString().split('T')[0]
  );
  
  const upcomingAppointments = appointments.filter(apt => 
    apt.doctorId === user?.id && apt.status === 'scheduled'
  );

  const stats = [
    {
      title: "Today's Appointments",
      value: todayAppointments.length,
      icon: Calendar,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: "Total Patients",
      value: "45",
      icon: Users,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: "Pending Reviews",
      value: "8",
      icon: Clock,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50'
    },
    {
      title: "New Messages",
      value: "12",
      icon: MessageSquare,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white p-6">
        <h1 className="text-2xl font-bold mb-2">Good morning, {user?.name}!</h1>
        <p className="text-blue-100">You have {todayAppointments.length} appointments scheduled for today</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="text-center">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-sm text-gray-600">{stat.title}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Today's Schedule</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onTabChange('appointments')}
            >
              View All
            </Button>
          </div>
          
          <div className="space-y-3">
            {todayAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{appointment.patientName}</p>
                    <p className="text-sm text-gray-600">{appointment.reason}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{appointment.time}</p>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {appointment.status}
                  </span>
                </div>
              </div>
            ))}
            
            {todayAppointments.length === 0 && (
              <p className="text-gray-500 text-center py-4">No appointments scheduled for today</p>
            )}
          </div>
        </Card>

        {/* Patient Requests */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Patient Requests</h2>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="font-medium text-gray-900">John Doe</p>
                  <p className="text-sm text-gray-600">Requests medication adjustment</p>
                </div>
              </div>
              <Button size="sm" variant="primary">
                Review
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-medium text-gray-900">Mary Johnson</p>
                  <p className="text-sm text-gray-600">New message about symptoms</p>
                </div>
              </div>
              <Button size="sm" variant="secondary">
                Reply
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity & Analytics Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Completed appointment with John Smith</span>
              <span className="text-gray-400 ml-auto">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">Updated treatment plan for Mary Johnson</span>
              <span className="text-gray-400 ml-auto">4 hours ago</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-600">Reviewed lab results for 3 patients</span>
              <span className="text-gray-400 ml-auto">6 hours ago</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Patient Analytics</h2>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Appointment Completion Rate</span>
                <span className="font-medium">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Patient Satisfaction</span>
                <span className="font-medium">96%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '96%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Response Time</span>
                <span className="font-medium">2.1 hrs</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};