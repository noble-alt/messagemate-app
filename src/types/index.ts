import { Database } from '../lib/database.types'

// Legacy types for compatibility
export interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
  type: "text" | "image" | "audio";
}

// Real backend types
export type Profile = Database['public']['Tables']['profiles']['Row']
export type ContactWithProfile = Database['public']['Tables']['contacts']['Row'] & {
  contact_profile: Profile
}
export type MessageType = Database['public']['Tables']['messages']['Row']
export type Conversation = Database['public']['Tables']['conversations']['Row']