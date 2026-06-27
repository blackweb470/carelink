import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wgvsipvbccgslxaqgwwe.supabase.co';
const supabaseKey = 'sb_publishable_Tb8MvgZhLjwJZ5Dw7LJDVw_GPOP8LGw';

export const supabase = createClient(supabaseUrl, supabaseKey);
