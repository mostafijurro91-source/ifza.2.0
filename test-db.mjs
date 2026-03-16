import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTables() {
  console.log('Checking tables...');
  
  const tables = ['admins', 'app_admins', 'profiles'];
  
  for (const table of tables) {
    const { data, error } = await supabase.from(table).select('count', { count: 'exact', head: true });
    if (error) {
      console.log(`Table "${table}" error:`, error.message);
    } else {
      console.log(`Table "${table}" exists. Count:`, data);
      
      // Try to check for password column
      const { data: colData, error: colError } = await supabase.from(table).select('*').limit(1);
      if (!colError && colData && colData.length > 0) {
        console.log(`Sample data from "${table}":`, Object.keys(colData[0]));
      }
    }
  }
}

checkTables();
