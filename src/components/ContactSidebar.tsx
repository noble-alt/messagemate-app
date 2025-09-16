import { Search, MoreVertical, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Contact } from "./ChatInterface";
import { cn } from "../lib/utils";

interface ContactSidebarProps {
  contacts: Contact[];
  selectedContact: Contact | null;
  onContactSelect: (contact: Contact) => void;
}

export const ContactSidebar = ({ 
  contacts, 
  selectedContact, 
  onContactSelect 
}: ContactSidebarProps) => {
  return (
    <div className="w-80 border-r border-border bg-card flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-primary" />
          WhatsApp Web
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
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={cn(
              "flex items-center p-4 cursor-pointer hover:bg-muted/50 transition-colors",
              selectedContact?.id === contact.id && "bg-muted"
            )}
            onClick={() => onContactSelect(contact)}
          >
            <div className="relative">
              <Avatar className="w-12 h-12">
                <AvatarImage src={contact.avatar} alt={contact.name} />
                <AvatarFallback>{contact.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              {contact.isOnline && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-status-online rounded-full border-2 border-background" />
              )}
            </div>
            
            <div className="ml-3 flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-medium truncate">{contact.name}</h3>
                <span className="text-xs text-muted-foreground">{contact.timestamp}</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                {contact.unreadCount > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5 min-w-[1.25rem] text-center">
                    {contact.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};