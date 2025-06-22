import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, User } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { appointments } from '../../data/mockData';

interface AppointmentCalendarProps {
  onBookAppointment: (date: string, time: string) => void;
}

export const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({ onBookAppointment }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const formatDate = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return date.toISOString().split('T')[0];
  };

  const isDateAvailable = (day: number) => {
    const date = formatDate(day);
    const today = new Date().toISOString().split('T')[0];
    return date >= today;
  };

  const hasAppointment = (day: number) => {
    const date = formatDate(day);
    return appointments.some(apt => apt.date === date);
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = formatDate(day);
      const isAvailable = isDateAvailable(day);
      const hasApt = hasAppointment(day);
      const isSelected = selectedDate === date;
      
      days.push(
        <button
          key={day}
          onClick={() => isAvailable && setSelectedDate(date)}
          disabled={!isAvailable}
          className={`
            p-2 text-sm rounded-lg transition-colors relative
            ${isSelected 
              ? 'bg-blue-600 text-white' 
              : isAvailable 
                ? 'hover:bg-blue-50 text-gray-900' 
                : 'text-gray-400 cursor-not-allowed'
            }
            ${hasApt ? 'font-semibold' : ''}
          `}
        >
          {day}
          {hasApt && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
          )}
        </button>
      );
    }
    
    return days;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Calendar */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Select Date</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <span className="text-lg font-medium text-gray-900 min-w-[140px] text-center">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <button
              onClick={() => navigateMonth('next')}
              className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {renderCalendarDays()}
        </div>

        <div className="mt-4 text-xs text-gray-500 space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span>Has appointments</span>
          </div>
        </div>
      </Card>

      {/* Time Slots */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          {selectedDate ? `Available Times - ${selectedDate}` : 'Select a date first'}
        </h2>

        {selectedDate ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map(time => (
                <button
                  key={time}
                  onClick={() => onBookAppointment(selectedDate, time)}
                  className="flex items-center justify-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                >
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">{time}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Clock className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>Please select a date to view available time slots</p>
          </div>
        )}
      </Card>
    </div>
  );
};