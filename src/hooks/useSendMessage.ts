import { useState } from 'react'
import { useAuth } from './useAuth'

export const useSendMessage = (contactId: string | null, onMessageSent?: () => void) => {
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  const sendMessage = async (content: string) => {
    if (!user || !content.trim() || !contactId) return

    setLoading(true)
    try {
      // For now, just simulate sending and call refresh
      console.log('Sending message:', content, 'to:', contactId)
      
      // Call the callback to refresh messages
      onMessageSent?.()

    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setLoading(false)
    }
  }

  return { sendMessage, loading }
}