import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function uploadFile(file, userId) {
  const { data, error } = await supabase.storage
    .from('profile-images')
    .upload(`${userId}/${file.name}`, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from('profile-images')
    .getPublicUrl(`${userId}/${file.name}`);

  return urlData.publicUrl;
}
