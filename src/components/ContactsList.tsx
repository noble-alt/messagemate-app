import { useContacts } from '../hooks/useContacts'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { formatDistanceToNow } from 'date-fns'

interface ContactsListProps {
  onContactSelect: (contactId: string) => void
  selectedContactId?: string
}

export const ContactsList = ({ onContactSelect, selectedContactId }: ContactsListProps) => {
  const { contacts, loading } = useContacts()

  if (loading) {
    return (
      <div className="p-4 space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-3 animate-pulse">
            <div className="w-12 h-12 bg-muted rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (contacts.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        <p>No contacts yet</p>
        <p className="text-sm mt-1">Add some contacts to start chatting</p>
      </div>
    )
  }

  return (
    <div className="space-y-1">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          onClick={() => onContactSelect(contact.contact_id)}
          className={`flex items-center p-3 hover:bg-muted/50 cursor-pointer transition-colors ${
            selectedContactId === contact.contact_id ? 'bg-muted' : ''
          }`}
        >
          <div className="relative">
            <Avatar className="w-12 h-12">
              <AvatarImage 
                src={contact.contact_profile.avatar_url || ''} 
                alt={contact.contact_profile.display_name || ''} 
              />
              <AvatarFallback>
                {contact.contact_profile.display_name?.slice(0, 2).toUpperCase() || 
                 contact.contact_profile.phone_number?.slice(-2) || '??'}
              </AvatarFallback>
            </Avatar>
            {contact.contact_profile.status === 'online' && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-status-online rounded-full border-2 border-background" />
            )}
          </div>
          
          <div className="ml-3 flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-medium truncate">
                {contact.contact_name || contact.contact_profile.display_name || contact.contact_profile.phone_number}
              </h3>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(contact.contact_profile.last_seen), { addSuffix: true })}
              </span>
            </div>
            <p className="text-sm text-muted-foreground truncate">
              {contact.contact_profile.status === 'online' ? 'Online' : 'Last seen recently'}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}