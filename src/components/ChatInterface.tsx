import { useState } from "react";
import { ContactSidebar } from "./ContactSidebar";
import { ChatArea } from "./ChatArea";
import { mockContacts, mockMessages } from "../lib/mock-data";

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

export const ChatInterface = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(mockContacts[0]);
  const [contacts] = useState<Contact[]>(mockContacts);
  
  const currentMessages = selectedContact 
    ? mockMessages.filter(msg => 
        msg.senderId === selectedContact.id || msg.senderId === "me"
      )
    : [];

  return (
    <div className="flex h-screen bg-background">
      <ContactSidebar
        contacts={contacts}
        selectedContact={selectedContact}
        onContactSelect={setSelectedContact}
      />
      <ChatArea
        contact={selectedContact}
        messages={currentMessages}
      />
    </div>
  );
};