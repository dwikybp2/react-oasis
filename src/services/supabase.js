
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://buqvfcgvbksrraoowopb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1cXZmY2d2YmtzcnJhb293b3BiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjczOTI2NTMsImV4cCI6MjA0Mjk2ODY1M30.-zIJ9rwRcxYnaAtFQEwlbSqrVvnJck58BkuymKHg5ls'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;