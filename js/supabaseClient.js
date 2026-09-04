// supabaseClient.js
// Fill in your project's URL and ANON key (Dashboard > Project Settings > API).
// The anon key is safe to expose in the browser — RLS policies control what it can do.
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

export const SUPABASE_URL = 'https://hiknotcssvgndjtnrfes.supabase.co';
export const SUPABASE_ANON_KEY = 'sb_publishable_utn2Pz1UWodVmKKY8_w0TA_9T1KsFzt';

// Where the judge server (judge-server/server.js) is deployed.
export const JUDGE_SERVER_URL = 'http://localhost:4000';
export const JUDGE_SHARED_SECRET = 'change-me-to-a-long-random-string'; // must match judge-server/.env

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function requireProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  return profile;
}
