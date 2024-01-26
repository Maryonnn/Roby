import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gvzzvxewlludtxiofruw.supabase.co' 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2enp2eGV3bGx1ZHR4aW9mcnV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYyMzExMzYsImV4cCI6MjAyMTgwNzEzNn0.xlLHS-zC8sZT7afjzSIirSFUEJo2LeUGnl9S1juEhVI'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase;