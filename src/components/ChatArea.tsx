import { useState } from "react";
import { Send, Smile, Paperclip, Mic, MoreVertical, Phone, Video, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ContactWithProfile, MessageType } from "../types";
import { MessageBubble } from "./MessageBubble";
import { cn } from "../lib/utils";

interface ChatAreaProps {
  contact: ContactWithProfile | null;
  messages: MessageType[];
  onRefreshMessages?: () => void;
}

export const ChatArea = ({ contact, messages, onRefreshMessages }: ChatAreaProps) => {
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage)
      setNewMessage("")
      onRefreshMessages?.()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!contact) {
    return (
      <div className="flex-1 flex items-center justify-center bg-chat-background">
        <div className="text-center text-muted-foreground">
          <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <h2 className="text-xl mb-2">Best line</h2>
          <p>Select a chat to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-chat-background">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 bg-card border-b border-border">
        <div className="flex items-center">
          <div className="relative">
            <Avatar className="w-10 h-10">
              <AvatarImage src={contact.contact_profile.avatar_url || ''} alt={contact.contact_profile.display_name || ''} />
              <AvatarFallback>
                {(contact.contact_name || contact.contact_profile.display_name || contact.contact_profile.phone_number || '??').slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {contact.contact_profile.status === 'online' && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-status-online rounded-full border-2 border-background" />
            )}
          </div>
          <div className="ml-3">
            <h3 className="font-medium">
              {contact.contact_name || contact.contact_profile.display_name || contact.contact_profile.phone_number}
            </h3>
            <p className="text-xs text-muted-foreground">
              {contact.contact_profile.status === 'online' ? "online" : "last seen recently"}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Phone className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isOwn={message.sender_id === "me"}
          />
        ))}
        
        {isTyping && (
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Avatar className="w-6 h-6">
              <AvatarImage src={contact.contact_profile.avatar_url || ''} alt={contact.contact_profile.display_name || ''} />
              <AvatarFallback className="text-xs">
                {(contact.contact_name || contact.contact_profile.display_name || '??').slice(0, 1)}
              </AvatarFallback>
            </Avatar>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.1s]" />
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
            </div>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="p-4 bg-card border-t border-border">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Paperclip className="w-5 h-5" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="pr-10"
            />
            <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2">
              <Smile className="w-4 h-4" />
            </Button>
          </div>
          
          {newMessage.trim() ? (
            <Button onClick={handleSendMessage} size="icon">
              <Send className="w-4 h-4" />
            </Button>
          ) : (
            <Button variant="ghost" size="icon">
              <Mic className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};