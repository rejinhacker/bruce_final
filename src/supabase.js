import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://rqvewhmioyhgnvrxiziq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxdmV3aG1pb3loZ252cnhpemlxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNTkyMTcxMiwiZXhwIjoyMDQxNDk3NzEyfQ.WxaH4xof9bUgYzNV0ydxvhU9QZviozBkD8aKTPq8NfQ'

export const supabase = createClient(supabaseUrl, supabaseKey)

