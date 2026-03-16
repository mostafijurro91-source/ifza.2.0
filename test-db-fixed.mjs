import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://txqmgxueteikodhqokwy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4cW1neHVldGVpa29kaHFva3d5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MDQxNTgsImV4cCI6MjA4ODI4MDE1OH0.WfwyLC4-9KBaZ9jwLMvdDX48pNwlNfgm_zWe5RtDPhM';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTables() {
  console.log('Checking tables...');
  
  const tables = ['admins', 'app_admins', 'profiles'];
  
  for (const table of tables) {
    try {
      const { data, error } = await supabase.from(table).select('count', { count: 'exact', head: true });
      if (error) {
        console.log(`Table "${table}" error:`, error.message);
      } else {
        console.log(`Table "${table}" exists. Count:`, data);
        
        // Try to check for columns
        const { data: colData, error: colError } = await supabase.from(table).select('*').limit(1);
        if (!colError && colData && colData.length > 0) {
          console.log(`Sample data columns from "${table}":`, Object.keys(colData[0]));
        } else if (colError) {
          console.log(`Error getting columns for "${table}":`, colError.message);
        }
      }
    } catch (e) {
      console.log(`Exception checking table "${table}":`, e.message);
    }
  }
}

checkTables();
