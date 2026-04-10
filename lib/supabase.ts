import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL ?? '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';

let _supabaseAdmin: any = null;
if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
  _supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });
} else {
  // Minimal chainable stub to avoid runtime errors during build when env vars are not set.
  const emptyResult = { data: [], error: null };

  function makeChainable() {
    const obj: any = {};
    obj.eq = (_k: string, _v: any) => obj;
    obj.order = async (_col?: string, _opts?: any) => ({ data: [], error: null });
    obj.limit = async (_n?: number) => ({ data: [], error: null });
    obj.select = (_cols?: any) => obj;
    // allow awaiting the chain directly
    obj.then = (resolve: any, reject: any) => Promise.resolve(emptyResult).then(resolve, reject);
    return obj;
  }

  _supabaseAdmin = {
    from: (_: string) => ({
      ...makeChainable(),
      insert: async (_row: any) => ({ data: null, error: null }),
      upsert: async (_row: any, _opts?: any) => ({ data: null, error: null }),
      update: async (_row: any) => ({ data: null, error: null }),
    }),
  };
}

export const supabaseAdmin = _supabaseAdmin;
