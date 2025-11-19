import { createClient } from '@supabase/supabase-js';

// Configuración proporcionada por el usuario
const supabaseUrl = 'https://rmdlxyithpfdoemsajcs.supabase.co';
// Nota: En un entorno real, esta clave debería venir de process.env
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtZGx4eWl0aHBmZG9lbXNhamNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1MTU5MjIsImV4cCI6MjA3OTA5MTkyMn0.aHqYIavBaEDCGg-MPI5D2X2T_wbXW7VpQyJ-xmumihI';

export const supabase = createClient(supabaseUrl, supabaseKey);