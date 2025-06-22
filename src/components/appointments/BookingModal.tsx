import React, { useState } from 'react';
import { X, Calendar, Clock, User, FileText } from 'lucide-react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: string;
  time: string;
  onConfirm: (reason: string, type: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  date,
  time,
  onConfirm
}) => {
  const [reason, setReason] = useState('');
  const [appointmentType, setAppointmentType] = useState('consultation');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onConfirm(reason, appointmentType);
    setIsLoading(false);
    onClose();
    setReason('');
    setAppointmentType('consultation');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Book Appointment</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Appointment Details */}
          <div className="bg-blue-50 rounded-lg p-4 space-y-2">
            <div className="flex items-center space-x-2 text-sm text-blue-700">
              <Calendar className="w-4 h-4" />
              <span>{new Date(date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-blue-700">
              <Clock className="w-4 h-4" />
              <span>{time}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-blue-700">
              <User className="w-4 h-4" />
              <span>Dr. Sarah Johnson - Cardiology</span>
            </div>
          </div>

          {/* Appointment Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Appointment Type
            </label>
            <select
              value={appointmentType}
              onChange={(e) => setAppointmentType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="consultation">Consultation</option>
              <option value="checkup">Regular Checkup</option>
              <option value="follow-up">Follow-up</option>
            </select>
          </div>

          {/* Reason */}
          <Input
            label="Reason for Visit"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Please describe your symptoms or reason for the appointment"
            icon={<FileText className="w-5 h-5 text-gray-400" />}
            required
          />

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isLoading}
              className="flex-1"
            >
              Book Appointment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};