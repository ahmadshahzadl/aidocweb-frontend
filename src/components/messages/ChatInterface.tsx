import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';
import { Button } from '../common/Button';
import { messages as initialMessages } from '../../data/mockData';
import { useAuth } from '../../hooks/useAuth';

export const ChatInterface: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now().toString(),
      senderId: user?.id || '',
      receiverId: user?.role === 'patient' ? '1' : '2',
      senderName: user?.name || '',
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate response from the other party
    setTimeout(() => {
      const response = {
        id: (Date.now() + 1).toString(),
        senderId: user?.role === 'patient' ? '1' : '2',
        receiverId: user?.id || '',
        senderName: user?.role === 'patient' ? 'Dr. Sarah Johnson' : 'John Smith',
        content: "Thanks for your message. I'll review this and get back to you shortly.",
        timestamp: new Date().toISOString(),
        read: false
      };
      setMessages(prev => [...prev, response]);
    }, 2000);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  let lastDate = '';

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <img
            src={user?.role === 'patient' 
              ? 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=150'
              : 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150'
            }
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-medium text-gray-900">
              {user?.role === 'patient' ? 'Dr. Sarah Johnson' : 'John Smith'}
            </h3>
            <p className="text-sm text-green-600">Online</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4" style={{ maxHeight: '400px' }}>
        {messages.map((message) => {
          const messageDate = formatDate(message.timestamp);
          const showDateSeparator = messageDate !== lastDate;
          lastDate = messageDate;
          
          const isOwnMessage = message.senderId === user?.id;

          return (
            <div key={message.id}>
              {showDateSeparator && (
                <div className="flex justify-center mb-4">
                  <span className="px-3 py-1 text-xs text-gray-500 bg-gray-100 rounded-full">
                    {messageDate}
                  </span>
                </div>
              )}
              
              <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'order-2' : 'order-1'}`}>
                  <div className={`px-4 py-2 rounded-lg ${
                    isOwnMessage 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <p className={`text-xs text-gray-500 mt-1 ${isOwnMessage ? 'text-right' : 'text-left'}`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Smile className="w-5 h-5" />
            </button>
          </div>
          
          <Button type="submit" size="sm" disabled={!newMessage.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};