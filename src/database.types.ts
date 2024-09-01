export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      booking_activity: {
        Row: {
          arrived_at: string | null
          booking_hours_id: number
          bpjs_number: string | null
          created_at: string | null
          date: string
          dokter_id: number
          id: number
          keluhan: string | null
          pasien_id: number
          patient_type: Database['public']['Enums']['patient_type']
          penyakit: string | null
          resep: string | null
          status:
            | Database['public']['Enums']['booking_activity_status_enum']
            | null
        }
        Insert: {
          arrived_at?: string | null
          booking_hours_id: number
          bpjs_number?: string | null
          created_at?: string | null
          date: string
          dokter_id: number
          id?: number
          keluhan?: string | null
          pasien_id: number
          patient_type: Database['public']['Enums']['patient_type']
          penyakit?: string | null
          resep?: string | null
          status?:
            | Database['public']['Enums']['booking_activity_status_enum']
            | null
        }
        Update: {
          arrived_at?: string | null
          booking_hours_id?: number
          bpjs_number?: string | null
          created_at?: string | null
          date?: string
          dokter_id?: number
          id?: number
          keluhan?: string | null
          pasien_id?: number
          patient_type?: Database['public']['Enums']['patient_type']
          penyakit?: string | null
          resep?: string | null
          status?:
            | Database['public']['Enums']['booking_activity_status_enum']
            | null
        }
        Relationships: [
          {
            foreignKeyName: 'booking_activity_ibfk_1'
            columns: ['dokter_id']
            isOneToOne: false
            referencedRelation: 'doctor'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'booking_activity_ibfk_2'
            columns: ['pasien_id']
            isOneToOne: false
            referencedRelation: 'patients'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'booking_activity_ibfk_3'
            columns: ['booking_hours_id']
            isOneToOne: false
            referencedRelation: 'booking_hours'
            referencedColumns: ['id']
          },
        ]
      }
      booking_hours: {
        Row: {
          ends_at: string
          id: number
          starts_at: string
        }
        Insert: {
          ends_at: string
          id?: number
          starts_at: string
        }
        Update: {
          ends_at?: string
          id?: number
          starts_at?: string
        }
        Relationships: []
      }
      doctor: {
        Row: {
          email: string | null
          id: number
          jam_kerja_end: string | null
          jam_kerja_start: string | null
          name: string | null
          phone: string | null
          poli_id: number
        }
        Insert: {
          email?: string | null
          id?: number
          jam_kerja_end?: string | null
          jam_kerja_start?: string | null
          name?: string | null
          phone?: string | null
          poli_id: number
        }
        Update: {
          email?: string | null
          id?: number
          jam_kerja_end?: string | null
          jam_kerja_start?: string | null
          name?: string | null
          phone?: string | null
          poli_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'doctor_poli_id_fkey'
            columns: ['poli_id']
            isOneToOne: false
            referencedRelation: 'poli'
            referencedColumns: ['id']
          },
        ]
      }
      patients: {
        Row: {
          address: string | null
          birthdate: string | null
          id: number
          name: string | null
          nik: string | null
          password: string
          phone: string | null
          user_id: string
        }
        Insert: {
          address?: string | null
          birthdate?: string | null
          id?: number
          name?: string | null
          nik?: string | null
          password: string
          phone?: string | null
          user_id: string
        }
        Update: {
          address?: string | null
          birthdate?: string | null
          id?: number
          name?: string | null
          nik?: string | null
          password?: string
          phone?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'patients_user_id_fkey'
            columns: ['user_id']
            isOneToOne: true
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      poli: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      booking_activity_status_enum: 'booked' | 'canceled' | 'done'
      patient_type: 'bpjs' | 'umum'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
  | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
    Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
  Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
      ? R
      : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
  PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
    PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
        ? R
        : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
  | keyof PublicSchema['Tables']
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
    Insert: infer I
  }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
  | keyof PublicSchema['Tables']
  | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
    Update: infer U
  }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U
    }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
  | keyof PublicSchema['Enums']
  | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never
