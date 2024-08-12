import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const supabaseUrl = 'https://hxplglmlatvmcyqvpkoc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4cGxnbG1sYXR2bWN5cXZwa29jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI5NDMyMDMsImV4cCI6MjAzODUxOTIwM30.kAAjs9FhoQtTZ_j6ut76taCUwUlIF1WlYPVwdIUUbiw'

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)
