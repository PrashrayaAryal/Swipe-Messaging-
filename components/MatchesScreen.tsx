import React from 'react';
import { Match } from '../types';
import { ChevronLeftIcon } from './icons';

interface MatchesScreenProps {
  matches: Match[];
  onSelectChat: (match: Match) => void;
  onBack: () => void;
}

const MatchesScreen: React.FC<MatchesScreenProps> = ({ matches, onSelectChat, onBack }) => {
  return (
    <div className="flex flex-col h-full bg-white">
      <header className="flex items-center p-4 border-b">
        <button onClick={onBack} className="text-gray-600 p-2 -ml-2">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-gray-800 flex-grow text-center">Matches</h1>
        <div className="w-6"></div>
      </header>

      {matches.length === 0 ? (
        <div className="flex-grow flex flex-col items-center justify-center text-center text-gray-500 p-4">
          <h2 className="text-2xl font-semibold">No matches yet.</h2>
          <p className="mt-2">Keep swiping to find your match!</p>
        </div>
      ) : (
        <div className="flex-grow overflow-y-auto">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-rose-500 mb-2">New Matches</h2>
            <div className="grid grid-cols-3 gap-4">
              {matches.map(match => (
                <div key={match.id} className="cursor-pointer" onClick={() => onSelectChat(match)}>
                  <div className="aspect-w-1 aspect-h-1">
                    <img src={match.user.photo} alt={match.user.name} className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <p className="text-center text-sm font-medium mt-1 truncate">{match.user.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Messages</h2>
            <ul>
              {matches.map(match => (
                <li key={match.id} className="flex items-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer" onClick={() => onSelectChat(match)}>
                  <img src={match.user.photo} alt={match.user.name} className="w-14 h-14 rounded-full object-cover" />
                  <div className="ml-4 flex-grow">
                    <p className="font-bold">{match.user.name}</p>
                    <p className="text-sm text-gray-500 truncate">
                      {match.messages[match.messages.length - 1]?.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchesScreen;
