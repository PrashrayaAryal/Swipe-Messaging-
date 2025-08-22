import React, { useState, useCallback } from 'react';
import { UserProfile, Match, Message, AppView } from './types';
import OnboardingScreen from './components/OnboardingScreen';
import SwipeScreen from './components/SwipeScreen';
import MatchesScreen from './components/MatchesScreen';
import ChatScreen from './components/ChatScreen';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.ONBOARDING);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [activeChat, setActiveChat] = useState<Match | null>(null);

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setCurrentView(AppView.SWIPING);
  };

  const handleNavigate = (view: AppView) => {
    setCurrentView(view);
  };

  const handleNewMatch = useCallback((newMatchProfile: UserProfile) => {
    const newMatch: Match = {
      id: `match_${Date.now()}`,
      user: newMatchProfile,
      messages: [
        {
          id: `msg_${Date.now()}`,
          text: `You matched with ${newMatchProfile.name}!`,
          sender: 'system',
          timestamp: new Date(),
        },
      ],
    };
    setMatches(prevMatches => [...prevMatches, newMatch]);
  }, []);

  const handleSelectChat = (match: Match) => {
    setActiveChat(match);
    setCurrentView(AppView.CHAT);
  };

  const handleBackToMatches = () => {
    setActiveChat(null);
    setCurrentView(AppView.MATCHES);
  };

  const handleBackToSwiping = () => {
    setActiveChat(null);
    setCurrentView(AppView.SWIPING);
  };

  const handleSendMessage = (matchId: string, message: Message) => {
    setMatches(prevMatches =>
      prevMatches.map(match => {
        if (match.id === matchId) {
          const updatedMessages = [...match.messages, message];
          // Simulate a reply
          setTimeout(() => {
            const reply: Message = {
              id: `msg_reply_${Date.now()}`,
              text: 'That sounds interesting! Tell me more.',
              sender: match.user.id,
              timestamp: new Date(),
            };
            setMatches(prev => prev.map(m => m.id === matchId ? {...m, messages: [...updatedMessages, reply]} : m));
          }, 1500);
          return { ...match, messages: updatedMessages };
        }
        return match;
      })
    );
  };

  const renderContent = () => {
    if (!userProfile) {
       return <OnboardingScreen onComplete={handleOnboardingComplete} />;
    }
    switch (currentView) {
      case AppView.SWIPING:
        return <SwipeScreen userProfile={userProfile} onNavigate={handleNavigate} onNewMatch={handleNewMatch} />;
      case AppView.MATCHES:
        return <MatchesScreen matches={matches} onSelectChat={handleSelectChat} onBack={handleBackToSwiping} />;
      case AppView.CHAT:
        if (activeChat) {
            const currentMatch = matches.find(m => m.id === activeChat.id);
            if (currentMatch) {
              return <ChatScreen match={currentMatch} onBack={handleBackToMatches} onSendMessage={handleSendMessage} />;
            }
        }
        // Fallback to matches if chat is not found
        return <MatchesScreen matches={matches} onSelectChat={handleSelectChat} onBack={handleBackToSwiping} />;
      default:
        return <OnboardingScreen onComplete={handleOnboardingComplete} />;
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-100 flex justify-center overflow-hidden">
      <div className="relative h-full w-full max-w-sm bg-white shadow-2xl overflow-hidden flex flex-col">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
