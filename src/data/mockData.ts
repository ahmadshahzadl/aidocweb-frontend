import { User, Appointment, Message, HealthMetric, Medication, Notification } from '../types';

export const users: User[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@hospital.com',
    role: 'doctor',
    specialization: 'Cardiology',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'john.smith@email.com',
    role: 'patient',
    dateOfBirth: '1985-03-15',
    phone: '+1 (555) 987-6543',
    address: '123 Main St, City, State 12345',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150'
  }
];

export const appointments: Appointment[] = [
  {
    id: '1',
    patientId: '2',
    doctorId: '1',
    patientName: 'John Smith',
    doctorName: 'Dr. Sarah Johnson',
    date: '2025-01-25',
    time: '10:00',
    reason: 'Regular checkup',
    status: 'scheduled',
    type: 'checkup'
  },
  {
    id: '2',
    patientId: '2',
    doctorId: '1',
    patientName: 'John Smith',
    doctorName: 'Dr. Sarah Johnson',
    date: '2025-01-28',
    time: '14:30',
    reason: 'Follow-up consultation',
    status: 'scheduled',
    type: 'follow-up'
  }
];

export const messages: Message[] = [
  {
    id: '1',
    senderId: '1',
    receiverId: '2',
    senderName: 'Dr. Sarah Johnson',
    content: 'Hello John, I wanted to follow up on your recent test results. Everything looks good, but please continue taking your medication as prescribed.',
    timestamp: '2025-01-20T14:30:00Z',
    read: true
  },
  {
    id: '2',
    senderId: '2',
    receiverId: '1',
    senderName: 'John Smith',
    content: 'Thank you doctor! I have a question about the dosage - should I take it with food?',
    timestamp: '2025-01-20T15:45:00Z',
    read: true
  }
];

export const healthMetrics: HealthMetric[] = [
  {
    id: '1',
    type: 'heart_rate',
    value: 72,
    unit: 'bpm',
    date: '2025-01-20'
  },
  {
    id: '2',
    type: 'blood_pressure',
    value: 120,
    systolic: 120,
    diastolic: 80,
    unit: 'mmHg',
    date: '2025-01-20'
  },
  {
    id: '3',
    type: 'glucose',
    value: 95,
    unit: 'mg/dL',
    date: '2025-01-20'
  },
  {
    id: '4',
    type: 'weight',
    value: 75,
    unit: 'kg',
    date: '2025-01-20'
  }
];

export const medications: Medication[] = [
  {
    id: '1',
    name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    startDate: '2025-01-01',
    endDate: '2025-03-01',
    taken: true,
    nextDose: '2025-01-21T08:00:00Z'
  },
  {
    id: '2',
    name: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    startDate: '2025-01-01',
    endDate: '2025-06-01',
    taken: false,
    nextDose: '2025-01-20T20:00:00Z'
  }
];

export const notifications: Notification[] = [
  {
    id: '1',
    type: 'medication',
    title: 'Medication Reminder',
    message: 'Time to take your Metformin (500mg)',
    timestamp: '2025-01-20T20:00:00Z',
    read: false,
    priority: 'high'
  },
  {
    id: '2',
    type: 'appointment',
    title: 'Upcoming Appointment',
    message: 'You have an appointment with Dr. Sarah Johnson tomorrow at 10:00 AM',
    timestamp: '2025-01-24T18:00:00Z',
    read: false,
    priority: 'medium'
  }
];