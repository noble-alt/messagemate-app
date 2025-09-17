import { useState } from "react";
import { ContactsList } from "./ContactsList";
import { ChatArea } from "./ChatArea";
import { useContacts } from "../hooks/useContacts";
import { useMessages } from "../hooks/useMessages";
import { Search, MoreVertical, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const ChatInterface = () => {
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const { contacts } = useContacts();
  const { messages, refreshMessages } = useMessages(selectedContactId);

  const selectedContact = selectedContactId 
    ? contacts.find(c => c.contact_id === selectedContactId)
    : null;

  return (
    <div className="flex h-screen bg-background">
      {/* Contacts Sidebar */}
      <div className="w-80 border-r border-border bg-card flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h1 className="text-xl font-semibold flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-primary" />
            Best line
          </h1>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search or start new chat"
              className="pl-10 bg-muted/50"
            />
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto">
          <ContactsList
            onContactSelect={setSelectedContactId}
            selectedContactId={selectedContactId}
          />
        </div>
      </div>

      {/* Chat Area */}
      <ChatArea
        contact={selectedContact}
        messages={messages}
        onRefreshMessages={refreshMessages}
      />
    </div>
  );
};