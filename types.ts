export interface UserProfile {
  id: string;
  name: string;
  age: number;
  bio: string;
  photo: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'system' | string; // 'user' is the app user, string is the matched user's ID
  timestamp: Date;
}

export interface Match {
  id: string;
  user: UserProfile;
  messages: Message[];
}

export enum AppView {
  ONBOARDING = 'ONBOARDING',
  SWIPING = 'SWIPING',
  MATCHES = 'MATCHES',
  CHAT = 'CHAT',
}
