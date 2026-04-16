import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(
    'https://vreokqsrshmvewlelkot.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyZW9rcXNyc2htdmV3bGVsa290Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNDU4MzIsImV4cCI6MjA4NTYyMTgzMn0.wT4IZYxa0DGh84BZnfMueH3KtXjU-4IknrIF0zbj5xU'
);

async function test() {
    const { data, error } = await supabase.from('imoveis_aprovados').select('*').limit(1);
    if (error) {
        console.error(error);
    } else {
        fs.writeFileSync('schema.json', JSON.stringify(data[0], null, 2), 'utf8');
    }
}

test();
