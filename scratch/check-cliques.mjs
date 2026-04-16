import { createClient } from '@supabase/supabase-client'
import dotenv from 'dotenv'
dotenv.config()

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY)

async function checkColumns() {
  const { data, error } = await supabase
    .from('imoveis')
    .select('*')
    .limit(1)
  
  if (error) {
    console.log('Error:', error)
  } else {
    console.log('Sample data columns:', Object.keys(data[0] || {}))
  }
}

checkColumns()
