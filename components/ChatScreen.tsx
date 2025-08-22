import React, { useState, useRef, useEffect } from 'react';
import { Match, Message } from '../types';
import { ChevronLeftIcon, SendIcon } from './icons';

interface ChatScreenProps {
  match: Match;
  onBack: () => void;
  onSendMessage: (matchId: string, message: Message) => void;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ match, onBack, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [match.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message: Message = {
        id: `msg_user_${Date.now()}`,
        text: newMessage.trim(),
        sender: 'user',
        timestamp: new Date(),
      };
      onSendMessage(match.id, message);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="flex items-center p-3 border-b bg-white shadow-sm z-10">
        <button onClick={onBack} className="p-2 text-gray-600 rounded-full hover:bg-gray-100">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <img src={match.user.photo} alt={match.user.name} className="w-10 h-10 rounded-full object-cover ml-2" />
        <h1 className="text-lg font-bold text-gray-800 ml-3">{match.user.name}</h1>
      </header>

      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {match.messages.map((msg) => {
          const isUser = msg.sender === 'user';
          const isSystem = msg.sender === 'system';

          if (isSystem) {
            return (
              <div key={msg.id} className="text-center text-xs text-gray-500 py-2">
                <p>{msg.text}</p>
              </div>
            );
          }

          return (
            <div key={msg.id} className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
              {!isUser && (
                <img src={match.user.photo} alt={match.user.name} className="w-6 h-6 rounded-full" />
              )}
              <div
                className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl ${
                  isUser
                    ? 'bg-rose-500 text-white rounded-br-lg'
                    : 'bg-white text-gray-800 rounded-bl-lg border'
                }`}
              >
                <p>{msg.text}</p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-2 bg-white border-t">
        <form onSubmit={handleSend} className="flex items-center space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-rose-400"
          />
          <button
            type="submit"
            className="bg-rose-500 text-white rounded-full p-3 transform hover:scale-110 transition-transform disabled:bg-gray-300"
            disabled={!newMessage.trim()}
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatScreen;
