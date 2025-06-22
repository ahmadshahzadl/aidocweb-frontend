import React from 'react';
import { MessageSquare } from 'lucide-react';
import { ChatInterface } from './ChatInterface';

export const Messages: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600">Secure communication with your healthcare provider</p>
        </div>
        <MessageSquare className="w-8 h-8 text-blue-600" />
      </div>

      <div style={{ height: '600px' }}>
        <ChatInterface />
      </div>
    </div>
  );
};