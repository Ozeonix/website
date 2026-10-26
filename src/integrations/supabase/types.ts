export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      contact_submissions: {
        Row: {
          budget: string
          city: string
          company: string | null
          country: string
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          referral_code: string | null
          requirements: string
          source_ip: string | null
          start_time: string
          user_agent: string | null
        }
        Insert: {
          budget: string
          city: string
          company?: string | null
          country: string
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          referral_code?: string | null
          requirements: string
          source_ip?: string | null
          start_time: string
          user_agent?: string | null
        }
        Update: {
          budget?: string
          city?: string
          company?: string | null
          country?: string
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          referral_code?: string | null
          requirements?: string
          source_ip?: string | null
          start_time?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      lead_notifications: {
        Row: {
          audience: string
          body: string
          channel: string
          created_at: string
          error: string | null
          id: string
          recipient: string
          referral_id: string | null
          sent: boolean
          subject: string
        }
        Insert: {
          audience?: string
          body?: string
          channel?: string
          created_at?: string
          error?: string | null
          id?: string
          recipient: string
          referral_id?: string | null
          sent?: boolean
          subject?: string
        }
        Update: {
          audience?: string
          body?: string
          channel?: string
          created_at?: string
          error?: string | null
          id?: string
          recipient?: string
          referral_id?: string | null
          sent?: boolean
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_notifications_referral_id_fkey"
            columns: ["referral_id"]
            isOneToOne: false
            referencedRelation: "referrals"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          environment: string
          id: string
          note: string | null
          package_slug: string | null
          payer_email: string | null
          payer_name: string | null
          payer_phone: string | null
          product_code: string
          provider: string
          purpose: string
          raw_response: Json | null
          ref_id: string | null
          referral_code: string | null
          status: string
          total_amount: number
          transaction_code: string | null
          transaction_uuid: string
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          environment?: string
          id?: string
          note?: string | null
          package_slug?: string | null
          payer_email?: string | null
          payer_name?: string | null
          payer_phone?: string | null
          product_code: string
          provider?: string
          purpose?: string
          raw_response?: Json | null
          ref_id?: string | null
          referral_code?: string | null
          status?: string
          total_amount: number
          transaction_code?: string | null
          transaction_uuid: string
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          environment?: string
          id?: string
          note?: string | null
          package_slug?: string | null
          payer_email?: string | null
          payer_name?: string | null
          payer_phone?: string | null
          product_code?: string
          provider?: string
          purpose?: string
          raw_response?: Json | null
          ref_id?: string | null
          referral_code?: string | null
          status?: string
          total_amount?: number
          transaction_code?: string | null
          transaction_uuid?: string
          updated_at?: string
        }
        Relationships: []
      }
      payouts: {
        Row: {
          amount: number
          created_at: string
          created_by: string | null
          id: string
          method: string | null
          note: string | null
          paid_at: string | null
          partner_id: string
          reference: string | null
          referral_id: string | null
          status: Database["public"]["Enums"]["payout_status"]
          updated_at: string
        }
        Insert: {
          amount?: number
          created_at?: string
          created_by?: string | null
          id?: string
          method?: string | null
          note?: string | null
          paid_at?: string | null
          partner_id: string
          reference?: string | null
          referral_id?: string | null
          status?: Database["public"]["Enums"]["payout_status"]
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          created_by?: string | null
          id?: string
          method?: string | null
          note?: string | null
          paid_at?: string | null
          partner_id?: string
          reference?: string | null
          referral_id?: string | null
          status?: Database["public"]["Enums"]["payout_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payouts_referral_id_fkey"
            columns: ["referral_id"]
            isOneToOne: false
            referencedRelation: "referrals"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          city: string | null
          company: string | null
          country: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          payout_details: string | null
          phone: string | null
          referral_code: string
          updated_at: string
        }
        Insert: {
          city?: string | null
          company?: string | null
          country?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id: string
          payout_details?: string | null
          phone?: string | null
          referral_code: string
          updated_at?: string
        }
        Update: {
          city?: string | null
          company?: string | null
          country?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          payout_details?: string | null
          phone?: string | null
          referral_code?: string
          updated_at?: string
        }
        Relationships: []
      }
      referrals: {
        Row: {
          admin_notes: string | null
          client_company: string | null
          client_email: string
          client_name: string
          client_phone: string | null
          commission_amount: number | null
          commission_rate: number
          created_at: string
          id: string
          notes: string | null
          paid_at: string | null
          partner_id: string
          payout_status: Database["public"]["Enums"]["payout_status"]
          project_value: number
          requirements: string | null
          source: string
          status: Database["public"]["Enums"]["referral_status"]
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          client_company?: string | null
          client_email: string
          client_name: string
          client_phone?: string | null
          commission_amount?: number | null
          commission_rate?: number
          created_at?: string
          id?: string
          notes?: string | null
          paid_at?: string | null
          partner_id: string
          payout_status?: Database["public"]["Enums"]["payout_status"]
          project_value?: number
          requirements?: string | null
          source?: string
          status?: Database["public"]["Enums"]["referral_status"]
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          client_company?: string | null
          client_email?: string
          client_name?: string
          client_phone?: string | null
          commission_amount?: number | null
          commission_rate?: number
          created_at?: string
          id?: string
          notes?: string | null
          paid_at?: string | null
          partner_id?: string
          payout_status?: Database["public"]["Enums"]["payout_status"]
          project_value?: number
          requirements?: string | null
          source?: string
          status?: Database["public"]["Enums"]["referral_status"]
          updated_at?: string
        }
        Relationships: []
      }
      service_packages: {
        Row: {
          created_at: string
          description: string
          features: Json
          id: string
          is_active: boolean
          name: string
          price: number
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string
          features?: Json
          id?: string
          is_active?: boolean
          name: string
          price: number
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          features?: Json
          id?: string
          is_active?: boolean
          name?: string
          price?: number
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_referral_code: { Args: never; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "partner"
      payout_status: "pending" | "paid"
      referral_status: "new" | "approved" | "won" | "lost" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "partner"],
      payout_status: ["pending", "paid"],
      referral_status: ["new", "approved", "won", "lost", "rejected"],
    },
  },
} as const
