import React from 'react';
import { Calendar, Clock, User, MapPin, Phone } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { appointments } from '../../data/mockData';
import { useAuth } from '../../hooks/useAuth';

export const AppointmentList: React.FC = () => {
  const { user } = useAuth();
  
  const userAppointments = appointments.filter(apt => 
    user?.role === 'patient' ? apt.patientId === user.id : apt.doctorId === user.id
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'consultation': return 'bg-purple-100 text-purple-800';
      case 'checkup': return 'bg-yellow-100 text-yellow-800';
      case 'follow-up': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {userAppointments.map((appointment) => (
        <Card key={appointment.id} hover>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex-1 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-gray-900">
                    {user?.role === 'patient' ? appointment.doctorName : appointment.patientName}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(appointment.type)}`}>
                    {appointment.type}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(appointment.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{appointment.time}</span>
                </div>
              </div>

              <div className="text-sm text-gray-700">
                <strong>Reason:</strong> {appointment.reason}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              {appointment.status === 'scheduled' && (
                <>
                  <Button variant="ghost" size="sm">
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    Directions
                  </Button>
                  <Button variant="danger" size="sm">
                    Cancel
                  </Button>
                </>
              )}
              {appointment.status === 'completed' && (
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              )}
            </div>
          </div>
        </Card>
      ))}

      {userAppointments.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments</h3>
            <p className="text-gray-500">You don't have any appointments scheduled yet.</p>
          </div>
        </Card>
      )}
    </div>
  );
};