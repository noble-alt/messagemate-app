export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          phone_number: string | null
          display_name: string | null
          avatar_url: string | null
          status: string
          last_seen: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          phone_number?: string | null
          display_name?: string | null
          avatar_url?: string | null
          status?: string
          last_seen?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          phone_number?: string | null
          display_name?: string | null
          avatar_url?: string | null
          status?: string
          last_seen?: string
          created_at?: string
          updated_at?: string
        }
      }
      contacts: {
        Row: {
          id: string
          user_id: string
          contact_id: string
          contact_name: string | null
          added_at: string
        }
        Insert: {
          id?: string
          user_id: string
          contact_id: string
          contact_name?: string | null
          added_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          contact_id?: string
          contact_name?: string | null
          added_at?: string
        }
      }
      conversations: {
        Row: {
          id: string
          participant_1: string
          participant_2: string
          last_message_at: string
          created_at: string
        }
        Insert: {
          id?: string
          participant_1: string
          participant_2: string
          last_message_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          participant_1?: string
          participant_2?: string
          last_message_at?: string
          created_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          conversation_id: string
          sender_id: string
          content: string
          message_type: string
          media_url: string | null
          status: string
          reply_to: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          sender_id: string
          content: string
          message_type?: string
          media_url?: string | null
          status?: string
          reply_to?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          sender_id?: string
          content?: string
          message_type?: string
          media_url?: string | null
          status?: string
          reply_to?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_or_create_conversation: {
        Args: {
          other_user_id: string
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}