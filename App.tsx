// import React, { useState, useCallback } from 'react';
// import { UserProfile, Match, Message, AppView } from './types';
// import OnboardingScreen from './components/OnboardingScreen';
// import SwipeScreen from './components/SwipeScreen';
// import MatchesScreen from './components/MatchesScreen';
// import ChatScreen from './components/ChatScreen';

// const App: React.FC = () => {
//   const [currentView, setCurrentView] = useState<AppView>(AppView.ONBOARDING);
//   const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
//   const [matches, setMatches] = useState<Match[]>([]);
//   const [activeChat, setActiveChat] = useState<Match | null>(null);

//   const handleOnboardingComplete = (profile: UserProfile) => {
//     setUserProfile(profile);
//     setCurrentView(AppView.SWIPING);
//   };

//   const handleNavigate = (view: AppView) => {
//     setCurrentView(view);
//   };

//   const handleNewMatch = useCallback((newMatchProfile: UserProfile) => {
//     const newMatch: Match = {
//       id: `match_${Date.now()}`,
//       user: newMatchProfile,
//       messages: [
//         {
//           id: `msg_${Date.now()}`,
//           text: `You matched with ${newMatchProfile.name}!`,
//           sender: 'system',
//           timestamp: new Date(),
//         },
//       ],
//     };
//     setMatches(prevMatches => [...prevMatches, newMatch]);
//   }, []);

//   const handleSelectChat = (match: Match) => {
//     setActiveChat(match);
//     setCurrentView(AppView.CHAT);
//   };

//   const handleBackToMatches = () => {
//     setActiveChat(null);
//     setCurrentView(AppView.MATCHES);
//   };

//   const handleBackToSwiping = () => {
//     setActiveChat(null);
//     setCurrentView(AppView.SWIPING);
//   };

//   const handleSendMessage = (matchId: string, message: Message) => {
//     setMatches(prevMatches =>
//       prevMatches.map(match => {
//         if (match.id === matchId) {
//           const updatedMessages = [...match.messages, message];
//           // Simulate a reply
//           setTimeout(() => {
//             const reply: Message = {
//               id: `msg_reply_${Date.now()}`,
//               text: 'That sounds interesting! Tell me more.',
//               sender: match.user.id,
//               timestamp: new Date(),
//             };
//             setMatches(prev => prev.map(m => m.id === matchId ? {...m, messages: [...updatedMessages, reply]} : m));
//           }, 1500);
//           return { ...match, messages: updatedMessages };
//         }
//         return match;
//       })
//     );
//   };

//   const renderContent = () => {
//     if (!userProfile) {
//        return <OnboardingScreen onComplete={handleOnboardingComplete} />;
//     }
//     switch (currentView) {
//       case AppView.SWIPING:
//         return <SwipeScreen userProfile={userProfile} onNavigate={handleNavigate} onNewMatch={handleNewMatch} />;
//       case AppView.MATCHES:
//         return <MatchesScreen matches={matches} onSelectChat={handleSelectChat} onBack={handleBackToSwiping} />;
//       case AppView.CHAT:
//         if (activeChat) {
//             const currentMatch = matches.find(m => m.id === activeChat.id);
//             if (currentMatch) {
//               return <ChatScreen match={currentMatch} onBack={handleBackToMatches} onSendMessage={handleSendMessage} />;
//             }
//         }
//         // Fallback to matches if chat is not found
//         return <MatchesScreen matches={matches} onSelectChat={handleSelectChat} onBack={handleBackToSwiping} />;
//       default:
//         return <OnboardingScreen onComplete={handleOnboardingComplete} />;
//     }
//   };

//   return (
//     <div className="h-screen w-screen bg-gray-100 flex justify-center overflow-hidden">
//       <div className="relative h-full w-full max-w-sm bg-white shadow-2xl overflow-hidden flex flex-col">
//         {renderContent()}
//       </div>
//     </div>
//   );
// };

// export default App;

// import React, { useState, useCallback } from 'react';
// import { UserProfile, Match, Message, AppView } from './types';
// import OnboardingScreen from './components/OnboardingScreen';
// import SwipeScreen from './components/SwipeScreen';
// import MatchesScreen from './components/MatchesScreen';
// import ChatScreen from './components/ChatScreen';
// import LoginScreen from './components/LoginScreen';

// const App: React.FC = () => {
//   const [currentView, setCurrentView] = useState<AppView>(AppView.LOGIN);
//   const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
//   const [matches, setMatches] = useState<Match[]>([]);
//   const [activeChat, setActiveChat] = useState<Match | null>(null);

//   // When onboarding is completed → save profile + go to swiping
//   const handleOnboardingComplete = (profile: UserProfile) => {
//     setUserProfile(profile);
//     setCurrentView(AppView.SWIPING);
//   };

//   // When login is completed → go to swiping (mock, no backend)
//   const handleLoginComplete = () => {
//     // Normally you’d verify login details before this
//     setCurrentView(AppView.SWIPING);
//   };

//   const handleNavigate = (view: AppView) => {
//     setCurrentView(view);
//   };

//   const handleNewMatch = useCallback((newMatchProfile: UserProfile) => {
//     const newMatch: Match = {
//       id: `match_${Date.now()}`,
//       user: newMatchProfile,
//       messages: [
//         {
//           id: `msg_${Date.now()}`,
//           text: `You matched with ${newMatchProfile.name}!`,
//           sender: 'system',
//           timestamp: new Date(),
//         },
//       ],
//     };
//     setMatches(prevMatches => [...prevMatches, newMatch]);
//   }, []);

//   const handleSelectChat = (match: Match) => {
//     setActiveChat(match);
//     setCurrentView(AppView.CHAT);
//   };

//   const handleBackToMatches = () => {
//     setActiveChat(null);
//     setCurrentView(AppView.MATCHES);
//   };

//   const handleBackToSwiping = () => {
//     setActiveChat(null);
//     setCurrentView(AppView.SWIPING);
//   };

//   const handleSendMessage = (matchId: string, message: Message) => {
//     setMatches(prevMatches =>
//       prevMatches.map(match => {
//         if (match.id === matchId) {
//           const updatedMessages = [...match.messages, message];
//           // Simulate a reply
//           setTimeout(() => {
//             const reply: Message = {
//               id: `msg_reply_${Date.now()}`,
//               text: 'That sounds interesting! Tell me more.',
//               sender: match.user.id,
//               timestamp: new Date(),
//             };
//             setMatches(prev =>
//               prev.map(m =>
//                 m.id === matchId
//                   ? { ...m, messages: [...updatedMessages, reply] }
//                   : m
//               )
//             );
//           }, 1500);
//           return { ...match, messages: updatedMessages };
//         }
//         return match;
//       })
//     );
//   };

//   const renderContent = () => {
//     switch (currentView) {
//       case AppView.LOGIN:
//         return <LoginScreen onLogin={handleLoginComplete} onSignUp={() => setCurrentView(AppView.ONBOARDING)} />;
//       case AppView.ONBOARDING:
//         return <OnboardingScreen onComplete={handleOnboardingComplete}
//         onBack={() => setCurrentView(AppView.LOGIN)} 
//         />;
//       case AppView.SWIPING:
//         if (!userProfile) {
//           // fallback: force signup if no profile exists
//           return <OnboardingScreen onComplete={handleOnboardingComplete} />;
//         }
//         return <SwipeScreen userProfile={userProfile} onNavigate={handleNavigate} onNewMatch={handleNewMatch} />;
//       case AppView.MATCHES:
//         return <MatchesScreen matches={matches} onSelectChat={handleSelectChat} onBack={handleBackToSwiping} />;
//       case AppView.CHAT:
//         if (activeChat) {
//           const currentMatch = matches.find(m => m.id === activeChat.id);
//           if (currentMatch) {
//             return <ChatScreen match={currentMatch} onBack={handleBackToMatches} onSendMessage={handleSendMessage} />;
//           }
//         }
//         return <MatchesScreen matches={matches} onSelectChat={handleSelectChat} onBack={handleBackToSwiping} />;
//       default:
//         return <LoginScreen onLogin={handleLoginComplete} onSignUp={() => setCurrentView(AppView.ONBOARDING)} />;
//     }
//   };

//  return (
//   <div className="min-h-screen w-full bg-gray-100 flex justify-center items-start
//                   p-2      /* default padding for very small screens */
//                   sm:p-4   /* small screens (≥640px) */
//                   md:p-6   /* medium screens (≥768px) */
//                   lg:p-8   /* large screens (≥1024px) */
//                   xl:p-10  /* extra-large screens (≥1280px) */
//                   2xl:p-12 /* 2xl screens (≥1536px) */
//                   ">
//     <div className="relative w-full max-w-5xl bg-white shadow-2xl overflow-auto flex flex-col rounded-lg">
//       {renderContent()}
//     </div>
//   </div>
// );


// };

// export default App;
 

import React, { useState, useCallback } from 'react';
import { UserProfile, Match, Message, AppView } from './types';
import OnboardingScreen from './components/OnboardingScreen';
import SwipeScreen from './components/SwipeScreen';
import MatchesScreen from './components/MatchesScreen';
import ChatScreen from './components/ChatScreen';
import LoginScreen from './components/LoginScreen';
import HomePage from './components/HomePage';   // 👈 NEW

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME); // 👈 start at Home
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [activeChat, setActiveChat] = useState<Match | null>(null);

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setCurrentView(AppView.SWIPING);
  };

  const handleLoginComplete = () => {
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
          setTimeout(() => {
            const reply: Message = {
              id: `msg_reply_${Date.now()}`,
              text: 'That sounds interesting! Tell me more.',
              sender: match.user.id,
              timestamp: new Date(),
            };
            setMatches(prev =>
              prev.map(m =>
                m.id === matchId ? { ...m, messages: [...updatedMessages, reply] } : m
              )
            );
          }, 1500);
          return { ...match, messages: updatedMessages };
        }
        return match;
      })
    );
  };

  const renderContent = () => {
    switch (currentView) {
      case AppView.HOME:
        return <HomePage onLogin={() => setCurrentView(AppView.LOGIN)} />;
      case AppView.LOGIN:
        return <LoginScreen onLogin={handleLoginComplete} onSignUp={() => setCurrentView(AppView.ONBOARDING)} 
        onBack={() => setCurrentView(AppView.HOME)} />;
      case AppView.ONBOARDING:
        return <OnboardingScreen onComplete={handleOnboardingComplete} onBack={() => setCurrentView(AppView.LOGIN)} />;
      case AppView.SWIPING:
        if (!userProfile) {
          return <OnboardingScreen onComplete={handleOnboardingComplete} onBack={() => setCurrentView(AppView.LOGIN)} />;
        }
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
        return <MatchesScreen matches={matches} onSelectChat={handleSelectChat} onBack={handleBackToSwiping} />;
      default:
        return <HomePage onLogin={() => setCurrentView(AppView.LOGIN)} />;
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-100 flex justify-center items-center overflow-auto">
      <div className="relative w-full max-w-md md:max-w-lg lg:max-w-2xl h-full md:h-auto bg-white shadow-2xl overflow-hidden flex flex-col">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
