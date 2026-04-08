import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL  = 'https://yealokfsvuxgqbfjrzht.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InllYWxva2ZzdnV4Z3FiZmpyemh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4MjA1NDIsImV4cCI6MjA4OTM5NjU0Mn0.jKyWl0nJCndmSwiliXUElIuJ_vcn4GBZTGlQaal7kNE';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);