export interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor';
  avatar?: string;
  specialization?: string; // for doctors
  dateOfBirth?: string; // for patients
  phone?: string;
  address?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  reason: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: 'consultation' | 'checkup' | 'follow-up';
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  senderName: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface HealthMetric {
  id: string;
  type: 'heart_rate' | 'blood_pressure' | 'glucose' | 'weight';
  value: number;
  unit: string;
  date: string;
  systolic?: number; // for blood pressure
  diastolic?: number; // for blood pressure
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  taken: boolean;
  nextDose: string;
}

export interface Notification {
  id: string;
  type: 'medication' | 'appointment' | 'alert';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}