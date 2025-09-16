// import React, { useState, useMemo, useCallback, useRef, PointerEvent } from 'react';
// import { UserProfile, AppView } from '../types';
// import { HeartIcon, CloseIcon, UserIcon, ChatBubbleIcon } from './icons';
// import MatchModal from './MatchModal';

// const mockProfiles: UserProfile[] = [
//   { id: '1', name: 'Jessica', age: 28, bio: 'Lover of dogs and long walks on the beach.', photo: 'https://picsum.photos/id/1027/400/600' },
//   { id: '2', name: 'Alex', age: 31, bio: 'Just a guy looking for his player 2.', photo: 'https://picsum.photos/id/1005/400/600' },
//   { id: '3', name: 'Maria', age: 25, bio: 'Travel enthusiast and foodie. Show me the best tacos!', photo: 'https://picsum.photos/id/1011/400/600' },
//   { id: '4', name: 'David', age: 29, bio: 'Musician and coffee aficionado.', photo: 'https://picsum.photos/id/1012/400/600' },
//   { id: '5', name: 'Chloe', age: 27, bio: 'Yoga, hiking, and anything outdoors.', photo: 'https://picsum.photos/id/1013/400/600' },
//   { id: '6', name: 'Ben', age: 33, bio: 'Into tech, startups, and sci-fi movies.', photo: 'https://picsum.photos/id/1014/400/600' },
// ];

// const Header: React.FC<{ onNavigate: (view: AppView) => void }> = ({ onNavigate }) => (
//   <header className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4">
//     <button onClick={() => onNavigate(AppView.ONBOARDING)} className="text-gray-400 hover:text-gray-600 transition-colors">
//       <UserIcon className="w-8 h-8" />
//     </button>
//     <h1 className="text-2xl font-bold text-rose-500">Discover</h1>
//     <button onClick={() => onNavigate(AppView.MATCHES)} className="text-gray-400 hover:text-gray-600 transition-colors">
//       <ChatBubbleIcon className="w-8 h-8" />
//     </button>
//   </header>
// );

// const SwipeableCard: React.FC<{ profile: UserProfile; onSwipe: (direction: 'left' | 'right') => void; isTop: boolean; }> = ({ profile, onSwipe, isTop }) => {
//     const cardRef = useRef<HTMLDivElement>(null);
//     const [style, setStyle] = useState({});
//     const [badge, setBadge] = useState<'like' | 'nope' | null>(null);

//     const startPos = useRef<{ x: number, y: number } | null>(null);

//     const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
//         if (!isTop) return;
//         startPos.current = { x: e.clientX, y: e.clientY };
//         cardRef.current?.setPointerCapture(e.pointerId);
//     };

//     const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
//         if (!startPos.current || !isTop) return;

//         const deltaX = e.clientX - startPos.current.x;
//         const deltaY = e.clientY - startPos.current.y;
//         const rotation = deltaX / 20;

//         setStyle({
//             transform: `translate(${deltaX}px, ${deltaY}px) rotate(${rotation}deg)`,
//             transition: 'none',
//         });

//         if (deltaX > 50) setBadge('like');
//         else if (deltaX < -50) setBadge('nope');
//         else setBadge(null);
//     };

//     const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
//         if (!startPos.current || !isTop) return;

//         const deltaX = e.clientX - startPos.current.x;
//         const swipeThreshold = window.innerWidth / 4;

//         if (Math.abs(deltaX) > swipeThreshold) {
//             const direction = deltaX > 0 ? 'right' : 'left';
//             const moveOutX = (deltaX > 0 ? 1 : -1) * window.innerWidth;
//             const rotation = deltaX / 20;
//             setStyle({
//                 transform: `translate(${moveOutX}px, ${-50}px) rotate(${rotation * 2}deg)`,
//                 transition: 'transform 0.5s ease-out',
//             });
//             setTimeout(() => onSwipe(direction), 100);
//         } else {
//             setStyle({
//                 transform: 'translate(0, 0) rotate(0)',
//                 transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
//             });
//         }
        
//         cardRef.current?.releasePointerCapture(e.pointerId);
//         startPos.current = null;
//         setBadge(null);
//     };
    
//     return (
//         <div 
//           ref={cardRef}
//           className={`absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing`}
//           style={{ ...style, touchAction: isTop ? 'none' : 'auto' }}
//           onPointerDown={handlePointerDown}
//           onPointerMove={handlePointerMove}
//           onPointerUp={handlePointerUp}
//           onPointerCancel={handlePointerUp}
//         >
//             <div className="relative w-full h-full bg-white rounded-2xl shadow-xl overflow-hidden">
//               <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
//               {badge === 'like' && (
//                   <div className="absolute top-12 left-8 transform -rotate-12 border-4 border-green-400 text-green-400 rounded-lg px-4 py-1 text-4xl font-bold uppercase tracking-wider">
//                       LIKE
//                   </div>
//               )}
//               {badge === 'nope' && (
//                   <div className="absolute top-12 right-8 transform rotate-12 border-4 border-red-500 text-red-500 rounded-lg px-4 py-1 text-4xl font-bold uppercase tracking-wider">
//                       NOPE
//                   </div>
//               )}
//               <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//                 <h2 className="text-3xl font-bold">{profile.name}, {profile.age}</h2>
//                 <p className="mt-2 text-lg">{profile.bio}</p>
//               </div>
//             </div>
//         </div>
//     );
// };

// const SwipeScreen: React.FC<{ userProfile: UserProfile, onNavigate: (view: AppView) => void; onNewMatch: (profile: UserProfile) => void; }> = ({ userProfile, onNavigate, onNewMatch }) => {
//   const [profiles, setProfiles] = useState(mockProfiles);
//   const [match, setMatch] = useState<UserProfile | null>(null);

//   const handleSwipe = useCallback((direction: 'left' | 'right', swipedProfile: UserProfile) => {
//     if (direction === 'right') {
//       // Simulate a match 50% of the time
//       if (Math.random() > 0.5) {
//         onNewMatch(swipedProfile);
//         setMatch(swipedProfile);
//       }
//     }
    
//     // Use timeout to allow card to animate out before removing
//     setTimeout(() => {
//         setProfiles(prev => prev.filter(p => p.id !== swipedProfile.id));
//     }, 300);

//   }, [onNewMatch]);

//   const swipeCurrentCard = (direction: 'left' | 'right') => {
//     if (profiles.length > 0) {
//       handleSwipe(direction, profiles[profiles.length - 1]);
//     }
//   };

//   const currentProfiles = useMemo(() => profiles.slice(-3), [profiles]);
  
//   return (
//     <div className="flex flex-col h-full w-full bg-gray-50">
//       <Header onNavigate={onNavigate} />
//       <div className="flex-grow flex flex-col items-center justify-center p-4 pt-20 pb-28">
//           <div className="w-full h-full max-h-[600px] relative">
//             {currentProfiles.length > 0 ? (
//                 currentProfiles.map((profile, index) => (
//                   <SwipeableCard 
//                     key={profile.id} 
//                     profile={profile}
//                     onSwipe={(dir) => handleSwipe(dir, profile)}
//                     isTop={index === currentProfiles.length - 1}
//                   />
//                 ))
//             ) : (
//                 <div className="flex flex-col items-center justify-center text-center text-gray-500 h-full">
//                     <p className="text-2xl font-semibold">That's everyone for now!</p>
//                     <p className="mt-2">Come back later for new profiles.</p>
//                 </div>
//             )}
//           </div>
//       </div>
      
//       {profiles.length > 0 && (
//           <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center p-4 space-x-8 bg-white/80 backdrop-blur-sm">
//             <button onClick={() => swipeCurrentCard('left')} className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center text-red-500 transform hover:scale-110 transition-transform">
//               <CloseIcon className="w-10 h-10" />
//             </button>
//             <button onClick={() => swipeCurrentCard('right')} className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center text-green-400 transform hover:scale-110 transition-transform">
//               <HeartIcon className="w-10 h-10" />
//             </button>
//           </div>
//       )}
      
//       {match && (
//         <MatchModal
//           userProfile={userProfile}
//           matchedProfile={match}
//           onClose={() => setMatch(null)}
//           onChat={() => {
//             setMatch(null);
//             onNavigate(AppView.MATCHES);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default SwipeScreen;


// import React, { useState, useEffect, useMemo, useCallback, useRef, PointerEvent } from 'react';
// import { UserProfile, AppView } from '../types';
// import { HeartIcon, CloseIcon, UserIcon, ChatBubbleIcon } from './icons';
// import MatchModal from './MatchModal';

// interface SwipeScreenProps {
//   userProfile: UserProfile;
//   onNavigate: (view: AppView) => void;
//   onNewMatch: (profile: UserProfile) => void;
// }

// const Header: React.FC<{ onNavigate: (view: AppView) => void }> = ({ onNavigate }) => (
//   <header className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4">
//     <button onClick={() => onNavigate(AppView.ONBOARDING)} className="text-gray-400 hover:text-gray-600 transition-colors">
//       <UserIcon className="w-8 h-8" />
//     </button>
//     <h1 className="text-2xl font-bold text-rose-500">Discover</h1>
//     <button onClick={() => onNavigate(AppView.MATCHES)} className="text-gray-400 hover:text-gray-600 transition-colors">
//       <ChatBubbleIcon className="w-8 h-8" />
//     </button>
//   </header>
// );

// const SwipeableCard: React.FC<{ profile: UserProfile; onSwipe: (direction: 'left' | 'right') => void; isTop: boolean; }> = ({ profile, onSwipe, isTop }) => {
//   const cardRef = useRef<HTMLDivElement>(null);
//   const [style, setStyle] = useState({});
//   const [badge, setBadge] = useState<'like' | 'nope' | null>(null);
//   const startPos = useRef<{ x: number, y: number } | null>(null);

//   const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
//     if (!isTop) return;
//     startPos.current = { x: e.clientX, y: e.clientY };
//     cardRef.current?.setPointerCapture(e.pointerId);
//   };

//   const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
//     if (!startPos.current || !isTop) return;
//     const deltaX = e.clientX - startPos.current.x;
//     const deltaY = e.clientY - startPos.current.y;
//     const rotation = deltaX / 20;

//     setStyle({
//       transform: `translate(${deltaX}px, ${deltaY}px) rotate(${rotation}deg)`,
//       transition: 'none',
//     });

//     if (deltaX > 50) setBadge('like');
//     else if (deltaX < -50) setBadge('nope');
//     else setBadge(null);
//   };

//   const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
//     if (!startPos.current || !isTop) return;

//     const deltaX = e.clientX - startPos.current.x;
//     const swipeThreshold = window.innerWidth / 4;

//     if (Math.abs(deltaX) > swipeThreshold) {
//       const direction = deltaX > 0 ? 'right' : 'left';
//       const moveOutX = (deltaX > 0 ? 1 : -1) * window.innerWidth;
//       const rotation = deltaX / 20;
//       setStyle({
//         transform: `translate(${moveOutX}px, ${-50}px) rotate(${rotation * 2}deg)`,
//         transition: 'transform 0.5s ease-out',
//       });
//       setTimeout(() => onSwipe(direction), 100);
//     } else {
//       setStyle({
//         transform: 'translate(0, 0) rotate(0)',
//         transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
//       });
//     }

//     cardRef.current?.releasePointerCapture(e.pointerId);
//     startPos.current = null;
//     setBadge(null);
//   };

//   return (
//     <div
//       ref={cardRef}
//       className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
//       style={{ ...style, touchAction: isTop ? 'none' : 'auto' }}
//       onPointerDown={handlePointerDown}
//       onPointerMove={handlePointerMove}
//       onPointerUp={handlePointerUp}
//       onPointerCancel={handlePointerUp}
//     >
//       <div className="relative w-full h-full bg-white rounded-2xl shadow-xl overflow-hidden">
//         <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
//         {badge === 'like' && (
//           <div className="absolute top-12 left-8 transform -rotate-12 border-4 border-green-400 text-green-400 rounded-lg px-4 py-1 text-4xl font-bold uppercase tracking-wider">
//             LIKE
//           </div>
//         )}
//         {badge === 'nope' && (
//           <div className="absolute top-12 right-8 transform rotate-12 border-4 border-red-500 text-red-500 rounded-lg px-4 py-1 text-4xl font-bold uppercase tracking-wider">
//             NOPE
//           </div>
//         )}
//         <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
//           <h2 className="text-3xl font-bold">{profile.name}, {profile.age}</h2>
//           <p className="mt-2 text-lg">{profile.bio}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const SwipeScreen: React.FC<SwipeScreenProps> = ({ userProfile, onNavigate, onNewMatch }) => {
//   const [profiles, setProfiles] = useState<UserProfile[]>([]);
//   const [match, setMatch] = useState<UserProfile | null>(null);

//   // Fetch users from backend (excluding current user)
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await fetch('http://localhost:5000/api/users');
//         const data: UserProfile[] = await res.json();
//         const filtered = data.filter(u => u.id !== userProfile.id);
//         setProfiles(filtered);
//       } catch (err) {
//         console.error('Failed to fetch users:', err);
//       }
//     };
//     fetchUsers();
//   }, [userProfile.id]);

//   const handleSwipe = useCallback((direction: 'left' | 'right', swipedProfile: UserProfile) => {
//     if (direction === 'right') {
//       if (Math.random() > 0.5) { // simulate match
//         onNewMatch(swipedProfile);
//         setMatch(swipedProfile);
//       }
//     }
//     setProfiles(prev => prev.filter(p => p.id !== swipedProfile.id));
//   }, [onNewMatch]);

//   const swipeTopCard = (direction: 'left' | 'right') => {
//     if (profiles.length > 0) {
//       handleSwipe(direction, profiles[profiles.length - 1]);
//     }
//   };

//   const topProfiles = useMemo(() => profiles.slice(-3), [profiles]);

//   return (
//     <div className="flex flex-col h-full w-full bg-gray-50">
//       <Header onNavigate={onNavigate} />

//       <div className="flex-grow flex items-center justify-center p-4 pt-20 pb-28">
//         <div className="w-full h-full max-h-[600px] relative">
//           {topProfiles.length > 0 ? (
//             topProfiles.map((profile, index) => (
//               <SwipeableCard
//                 key={profile.id}
//                 profile={profile}
//                 onSwipe={(dir) => handleSwipe(dir, profile)}
//                 isTop={index === topProfiles.length - 1}
//               />
//             ))
//           ) : (
//             <div className="flex flex-col items-center justify-center text-center text-gray-500 h-full">
//               <p className="text-2xl font-semibold">That's everyone for now!</p>
//               <p className="mt-2">Come back later for new profiles.</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {profiles.length > 0 && (
//         <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center p-4 space-x-8 bg-white/80 backdrop-blur-sm">
//           <button onClick={() => swipeTopCard('left')} className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center text-red-500 transform hover:scale-110 transition-transform">
//             <CloseIcon className="w-10 h-10" />
//           </button>
//           <button onClick={() => swipeTopCard('right')} className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center text-green-400 transform hover:scale-110 transition-transform">
//             <HeartIcon className="w-10 h-10" />
//           </button>
//         </div>
//       )}

//       {match && (
//         <MatchModal
//           userProfile={userProfile}
//           matchedProfile={match}
//           onClose={() => setMatch(null)}
//           onChat={() => {
//             setMatch(null);
//             onNavigate(AppView.MATCHES);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default SwipeScreen;



import React, { useState, useMemo, useCallback, useRef, PointerEvent } from 'react';
import { UserProfile, AppView } from '../types';
import { HeartIcon, CloseIcon, UserIcon, ChatBubbleIcon } from './icons';
import MatchModal from './MatchModal';

interface SwipeScreenProps {
  userProfile: UserProfile;
  onNavigate: (view: AppView) => void;
  onNewMatch: (profile: UserProfile) => void;
}

// Demo profiles
const demoProfiles: UserProfile[] = [
  { id: '1', name: 'Jessica', age: 28, bio: 'Lover of dogs and long walks on the beach.', photo: 'https://picsum.photos/id/1027/400/600' },
  { id: '2', name: 'Alex', age: 31, bio: 'Just a guy looking for his player 2.', photo: 'https://picsum.photos/id/1005/400/600' },
  { id: '3', name: 'Maria', age: 25, bio: 'Travel enthusiast and foodie. Show me the best tacos!', photo: 'https://picsum.photos/id/1011/400/600' },
  { id: '4', name: 'David', age: 29, bio: 'Musician and coffee aficionado.', photo: 'https://picsum.photos/id/1012/400/600' },
  { id: '5', name: 'Chloe', age: 27, bio: 'Yoga, hiking, and anything outdoors.', photo: 'https://picsum.photos/id/1013/400/600' },
  { id: '6', name: 'Ben', age: 33, bio: 'Into tech, startups, and sci-fi movies.', photo: 'https://picsum.photos/id/1014/400/600' },
];

const Header: React.FC<{ onNavigate: (view: AppView) => void }> = ({ onNavigate }) => (
  <header className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4">
    <button onClick={() => onNavigate(AppView.ONBOARDING)} className="text-gray-400 hover:text-gray-600 transition-colors">
      <UserIcon className="w-8 h-8" />
    </button>
    <h1 className="text-2xl font-bold text-rose-500">Discover</h1>
    <button onClick={() => onNavigate(AppView.MATCHES)} className="text-gray-400 hover:text-gray-600 transition-colors">
      <ChatBubbleIcon className="w-8 h-8" />
    </button>
  </header>
);

// SwipeableCard component remains same as previous code
// ... include full SwipeableCard component here ...

// Add this **above** SwipeScreen component

const SwipeableCard: React.FC<{
  profile: UserProfile;
  onSwipe: (direction: 'left' | 'right') => void;
  isTop: boolean;
}> = ({ profile, onSwipe, isTop }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});
  const [badge, setBadge] = useState<'like' | 'nope' | null>(null);
  const startPos = useRef<{ x: number; y: number } | null>(null);

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (!isTop) return;
    startPos.current = { x: e.clientX, y: e.clientY };
    cardRef.current?.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!startPos.current || !isTop) return;

    const deltaX = e.clientX - startPos.current.x;
    const deltaY = e.clientY - startPos.current.y;
    const rotation = deltaX / 20;

    setStyle({
      transform: `translate(${deltaX}px, ${deltaY}px) rotate(${rotation}deg)`,
      transition: 'none',
    });

    if (deltaX > 50) setBadge('like');
    else if (deltaX < -50) setBadge('nope');
    else setBadge(null);
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (!startPos.current || !isTop) return;

    const deltaX = e.clientX - startPos.current.x;
    const swipeThreshold = window.innerWidth / 4;

    if (Math.abs(deltaX) > swipeThreshold) {
      const direction = deltaX > 0 ? 'right' : 'left';
      const moveOutX = (deltaX > 0 ? 1 : -1) * window.innerWidth;
      const rotation = deltaX / 20;
      setStyle({
        transform: `translate(${moveOutX}px, ${-50}px) rotate(${rotation * 2}deg)`,
        transition: 'transform 0.5s ease-out',
      });
      setTimeout(() => onSwipe(direction), 100);
    } else {
      setStyle({
        transform: 'translate(0, 0) rotate(0)',
        transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      });
    }

    cardRef.current?.releasePointerCapture(e.pointerId);
    startPos.current = null;
    setBadge(null);
  };

  return (
    <div
      ref={cardRef}
      className={`absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing`}
      style={{ ...style, touchAction: isTop ? 'none' : 'auto' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div className="relative w-full h-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        {badge === 'like' && (
          <div className="absolute top-12 left-8 transform -rotate-12 border-4 border-green-400 text-green-400 rounded-lg px-4 py-1 text-4xl font-bold uppercase tracking-wider">
            LIKE
          </div>
        )}
        {badge === 'nope' && (
          <div className="absolute top-12 right-8 transform rotate-12 border-4 border-red-500 text-red-500 rounded-lg px-4 py-1 text-4xl font-bold uppercase tracking-wider">
            NOPE
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h2 className="text-3xl font-bold">{profile.name}, {profile.age}</h2>
          <p className="mt-2 text-lg">{profile.bio}</p>
        </div>
      </div>
    </div>
  );
};


const SwipeScreen: React.FC<SwipeScreenProps> = ({ userProfile, onNavigate, onNewMatch }) => {
  const [profiles, setProfiles] = useState<UserProfile[]>(demoProfiles);
  const [match, setMatch] = useState<UserProfile | null>(null);

  const handleSwipe = useCallback((direction: 'left' | 'right', swipedProfile: UserProfile) => {
    if (direction === 'right' && Math.random() > 0.5) {
      // Random match simulation
      onNewMatch(swipedProfile);
      setMatch(swipedProfile);
    }
    setProfiles(prev => prev.filter(p => p.id !== swipedProfile.id));
  }, [onNewMatch]);

  const swipeTopCard = (direction: 'left' | 'right') => {
    if (profiles.length > 0) {
      handleSwipe(direction, profiles[profiles.length - 1]);
    }
  };

  const topProfiles = useMemo(() => profiles.slice(-3), [profiles]);

  return (
    <div className="flex flex-col h-full w-full bg-gray-50">
      <Header onNavigate={onNavigate} />

      <div className="flex-grow flex items-center justify-center p-4 pt-20 pb-28">
        <div className="w-full h-full max-h-[600px] relative">
          {topProfiles.length > 0 ? (
            topProfiles.map((profile, index) => (
              <SwipeableCard
                key={profile.id}
                profile={profile}
                onSwipe={(dir) => handleSwipe(dir, profile)}
                isTop={index === topProfiles.length - 1}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center text-center text-gray-500 h-full">
              <p className="text-2xl font-semibold">That's everyone for now!</p>
              <p className="mt-2">Come back later for new profiles.</p>
            </div>
          )}
        </div>
      </div>

      {profiles.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center p-4 space-x-8 bg-white/80 backdrop-blur-sm">
          <button onClick={() => swipeTopCard('left')} className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center text-red-500 transform hover:scale-110 transition-transform">
            <CloseIcon className="w-10 h-10" />
          </button>
          <button onClick={() => swipeTopCard('right')} className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center text-green-400 transform hover:scale-110 transition-transform">
            <HeartIcon className="w-10 h-10" />
          </button>
        </div>
      )}

      {match && (
        <MatchModal
          userProfile={userProfile}
          matchedProfile={match}
          onClose={() => setMatch(null)}
          onChat={() => {
            setMatch(null);
            onNavigate(AppView.MATCHES);
          }}
        />
      )}
    </div>
  );
};

export default SwipeScreen;
