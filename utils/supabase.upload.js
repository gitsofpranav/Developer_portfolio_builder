import { supabase } from './supabase.config';

export async function uploadFile(file, userId) {
  const fileName = `${userId}/${Date.now()}_${file.name}`;

  const { data, error } = await supabase.storage
    .from('profile-images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from('profile-images')
    .getPublicUrl(fileName);

  return urlData.publicUrl;
}
