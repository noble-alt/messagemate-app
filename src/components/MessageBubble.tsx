import { Check, CheckCheck } from "lucide-react";
import { Message } from "./ChatInterface";
import { cn } from "../lib/utils";

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

export const MessageBubble = ({ message, isOwn }: MessageBubbleProps) => {
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getStatusIcon = () => {
    switch (message.status) {
      case "sent":
        return <Check className="w-4 h-4 text-message-sent" />;
      case "delivered":
        return <CheckCheck className="w-4 h-4 text-message-delivered" />;
      case "read":
        return <CheckCheck className="w-4 h-4 text-message-read" />;
      default:
        return null;
    }
  };

  return (
    <div className={cn(
      "flex",
      isOwn ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-xs lg:max-w-md px-4 py-2 rounded-lg relative",
        isOwn 
          ? "bg-chat-bubble-sent text-chat-bubble-sent-text rounded-br-sm" 
          : "bg-chat-bubble-received text-chat-bubble-received-text rounded-bl-sm"
      )}>
        <p className="text-sm break-words">{message.text}</p>
        
        <div className={cn(
          "flex items-center justify-end gap-1 mt-1",
          isOwn ? "text-chat-bubble-sent-text/70" : "text-chat-bubble-received-text/70"
        )}>
          <span className="text-xs">{formatTime(message.timestamp)}</span>
          {isOwn && getStatusIcon()}
        </div>
      </div>
    </div>
  );
};