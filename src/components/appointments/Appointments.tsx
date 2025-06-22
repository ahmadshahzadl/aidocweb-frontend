import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../common/Button';
import { AppointmentCalendar } from './AppointmentCalendar';
import { AppointmentList } from './AppointmentList';
import { BookingModal } from './BookingModal';

export const Appointments: React.FC = () => {
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ date: string; time: string } | null>(null);

  const handleBookAppointment = (date: string, time: string) => {
    setSelectedSlot({ date, time });
    setShowBookingModal(true);
  };

  const handleConfirmBooking = (reason: string, type: string) => {
    // Here you would typically make an API call to book the appointment
    console.log('Booking appointment:', { ...selectedSlot, reason, type });
    
    // Show success message
    alert('Appointment booked successfully!');
    
    // Reset state
    setSelectedSlot(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600">Manage your healthcare appointments</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex bg-gray-100 rounded-lg">
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                view === 'list'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                view === 'calendar'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Book New
            </button>
          </div>
        </div>
      </div>

      {view === 'list' ? (
        <AppointmentList />
      ) : (
        <AppointmentCalendar onBookAppointment={handleBookAppointment} />
      )}

      <BookingModal
        isOpen={showBookingModal}
        onClose={() => {
          setShowBookingModal(false);
          setSelectedSlot(null);
        }}
        date={selectedSlot?.date || ''}
        time={selectedSlot?.time || ''}
        onConfirm={handleConfirmBooking}
      />
    </div>
  );
};