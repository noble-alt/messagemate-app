import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Database } from '../lib/database.types'

type Contact = Database['public']['Tables']['contacts']['Row'] & {
  contact_profile: Database['public']['Tables']['profiles']['Row']
}

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true)
      const { data: user } = await supabase.auth.getUser()
      
      if (!user.user) {
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('contacts')
        .select(`
          *,
          contact_profile:profiles(*)
        `)
        .eq('user_id', user.user.id)

      if (error) {
        console.error('Error fetching contacts:', error)
      } else {
        setContacts(data || [])
      }
      setLoading(false)
    }

    fetchContacts()
  }, [])

  const addContact = async (contactId: string, contactName?: string) => {
    const { data: user } = await supabase.auth.getUser()
    if (!user.user) return

    const { error } = await supabase
      .from('contacts')
      .insert({
        user_id: user.user.id,
        contact_id: contactId,
        contact_name: contactName,
      } as any)

    if (error) {
      console.error('Error adding contact:', error)
    } else {
      // Refresh contacts
      const { data } = await supabase
        .from('contacts')
        .select(`
          *,
          contact_profile:profiles(*)
        `)
        .eq('user_id', user.user.id)
      
      if (data) {
        setContacts(data)
      }
    }
  }

  return {
    contacts,
    loading,
    addContact,
  }
}