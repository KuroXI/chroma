import { createClient , SupabaseClientOptions} from "@supabase/supabase-js";

const options : SupabaseClientOptions<any> = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
};

export const supabase = createClient(
  process.env.NEXT_PUBLIC_DB_URL!,
  process.env.NEXT_PUBLIC_DB_ANON_KEY!,
  options
);