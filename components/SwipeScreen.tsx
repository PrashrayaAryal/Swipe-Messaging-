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



// import React, { useState, useMemo, useCallback, useRef, PointerEvent } from 'react';
// import { UserProfile, AppView } from '../types';
// import { HeartIcon, CloseIcon, UserIcon, ChatBubbleIcon } from './icons';
// import MatchModal from './MatchModal';

// interface SwipeScreenProps {
//   userProfile: UserProfile;
//   onNavigate: (view: AppView) => void;
//   onNewMatch: (profile: UserProfile) => void;
// }

// // Demo profiles
// const demoProfiles: UserProfile[] = [
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

// // SwipeableCard component remains same as previous code
// // ... include full SwipeableCard component here ...

// // Add this **above** SwipeScreen component

// const SwipeableCard: React.FC<{
//   profile: UserProfile;
//   onSwipe: (direction: 'left' | 'right') => void;
//   isTop: boolean;
// }> = ({ profile, onSwipe, isTop }) => {
//   const cardRef = useRef<HTMLDivElement>(null);
//   const [style, setStyle] = useState({});
//   const [badge, setBadge] = useState<'like' | 'nope' | null>(null);
//   const startPos = useRef<{ x: number; y: number } | null>(null);

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
//       className={`absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing`}
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
//   const [profiles, setProfiles] = useState<UserProfile[]>(demoProfiles);
//   const [match, setMatch] = useState<UserProfile | null>(null);

//   const handleSwipe = useCallback((direction: 'left' | 'right', swipedProfile: UserProfile) => {
//     if (direction === 'right' && Math.random() > 0.5) {
//       // Random match simulation
//       onNewMatch(swipedProfile);
//       setMatch(swipedProfile);
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



// // src/components/SwipeScreen.tsx
// import React, { useState, useMemo, useCallback, useRef, PointerEvent, useEffect } from 'react';
// import { UserProfile, AppView } from '../types';
// import { HeartIcon, CloseIcon, UserIcon, ChatBubbleIcon } from './icons';
// import MatchModal from './MatchModal';
// import { API_BASE_URL } from '../config';

// interface SwipeScreenProps {
//   userProfile: UserProfile; // current logged-in user
//   onNavigate: (view: AppView) => void;
//   onNewMatch: (profile: UserProfile) => void;
// }

// // Fallback demoProfiles (used only if fetch fails or empty)
// const demoProfiles: UserProfile[] = [
//   { id: '1', name: 'Jessica', age: 28, bio: 'Lover of dogs and long walks on the beach.', photo: 'https://picsum.photos/id/1027/400/600' },
//   { id: '2', name: 'Alex', age: 31, bio: 'Just a guy looking for his player 2.', photo: 'https://picsum.photos/id/1005/400/600' },
//   { id: '3', name: 'Maria', age: 25, bio: 'Travel enthusiast and foodie. Show me the best tacos!', photo: 'https://picsum.photos/id/1011/400/600' },
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

// const SwipeableCard: React.FC<{
//   profile: UserProfile;
//   onSwipe: (direction: 'left' | 'right') => void;
//   isTop: boolean;
// }> = ({ profile, onSwipe, isTop }) => {
//   const cardRef = useRef<HTMLDivElement>(null);
//   const [style, setStyle] = useState({});
//   const [badge, setBadge] = useState<'like' | 'nope' | null>(null);
//   const startPos = useRef<{ x: number; y: number } | null>(null);

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
//         transform: `translate(${moveOutX}px, -50px) rotate(${rotation * 2}deg)`,
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
//   const [profiles, setProfiles] = useState<UserProfile[]>(demoProfiles);
//   const [match, setMatch] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch users from backend
//   useEffect(() => {
//     const fetchProfiles = async () => {
//       setLoading(true);
//       try {
//         // if userProfile exists, exclude current user by id
//         const excludeIdParam = userProfile?.id ? `?excludeId=${userProfile.id}` : "";
//         const res = await fetch(`${API_BASE_URL}/api/auth/users${excludeIdParam}`);
//         if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
//         const users = await res.json();

//         // Map backend users to UserProfile shape expected by your app
//         const mapped = users.map((u: any) => ({
//           id: u._id,
//           name: u.name,
//           age: u.age || 25, // default if no age field
//           bio: u.bio || "",
//           photo: u.photo || "", // base64 or URL
//         })) as UserProfile[];

//         setProfiles(mapped.length > 0 ? mapped : demoProfiles);
//       } catch (err) {
//         console.error("Failed to fetch profiles", err);
//         setProfiles(demoProfiles);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfiles();
//   }, [userProfile]);

//   const handleSwipe = useCallback((direction: 'left' | 'right', swipedProfile: UserProfile) => {
//     if (direction === 'right' && Math.random() > 0.5) {
//       onNewMatch(swipedProfile);
//       setMatch(swipedProfile);
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
//           {loading ? (
//             <div className="text-center text-gray-500">Loading profiles...</div>
//           ) : topProfiles.length > 0 ? (
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


import React, { useEffect, useState } from "react";
import { UserProfile, AppView } from "../types";
import { HeartIcon, CloseIcon, UserIcon } from "./icons";

interface SwipeScreenProps {
  onMatch: (profile: UserProfile) => void;
  onNavigate: (view: AppView) => void;
  currentUser: UserProfile; // Logged-in user
}

const SwipeScreen: React.FC<SwipeScreenProps> = ({ onMatch, onNavigate, currentUser }) => {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://swipe-backend-s632.onrender.com/api/auth/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // token stored at login
          },
        });

        const data = await res.json();

        // Remove the logged-in user from the list
        const filtered = data.filter((u: UserProfile) => u._id !== currentUser._id);
        setProfiles(filtered);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, [currentUser]);

  const handleLike = () => {
    if (profiles[currentIndex]) {
      onMatch(profiles[currentIndex]); // Call match handler
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePass = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const handleProfileClick = () => {
    onNavigate(AppView.PROFILE); // 👈 Open Profile page
  };

  if (profiles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-600">
        <p>No more profiles</p>
        <button onClick={handleProfileClick} className="mt-4 p-2 bg-gray-200 rounded-full">
          <UserIcon className="w-6 h-6" />
        </button>
      </div>
    );
  }

  const currentProfile = profiles[currentIndex];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl font-bold">Swipe</h1>
        <button onClick={handleProfileClick} className="p-2 rounded-full bg-gray-200">
          <UserIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Profile Card */}
      {currentProfile && (
        <div className="flex-1 flex flex-col items-center justify-center">
          <img
            src={currentProfile.photo}
            alt={currentProfile.name}
            className="w-64 h-80 object-cover rounded-2xl shadow-lg"
          />
          <h2 className="mt-4 text-lg font-semibold">{currentProfile.name}</h2>
          <p className="text-gray-500">{currentProfile.bio}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-around p-6">
        <button
          onClick={handlePass}
          className="p-4 rounded-full bg-red-100 hover:bg-red-200"
        >
          <CloseIcon className="w-8 h-8 text-red-500" />
        </button>
        <button
          onClick={handleLike}
          className="p-4 rounded-full bg-green-100 hover:bg-green-200"
        >
          <HeartIcon className="w-8 h-8 text-green-500" />
        </button>
      </div>
    </div>
  );
};

export default SwipeScreen;

