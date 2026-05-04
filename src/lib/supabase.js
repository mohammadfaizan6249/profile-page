import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

function noopQuery() {
    const result = Promise.resolve({ data: null, error: null });
    const query = {
        select: () => query,
        eq: () => query,
        neq: () => query,
        in: () => query,
        is: () => query,
        gt: () => query,
        gte: () => query,
        lt: () => query,
        lte: () => query,
        like: () => query,
        ilike: () => query,
        contains: () => query,
        order: () => query,
        limit: () => query,
        single: () => Promise.resolve({ data: null, error: { message: 'Supabase is not configured.' } }),
        maybeSingle: () => Promise.resolve({ data: null, error: null }),
        insert: () => Promise.resolve({ data: null, error: { message: 'Supabase is not configured.' } }),
        update: () => Promise.resolve({ data: null, error: { message: 'Supabase is not configured.' } }),
        delete: () => Promise.resolve({ data: null, error: { message: 'Supabase is not configured.' } }),
        upsert: () => Promise.resolve({ data: null, error: { message: 'Supabase is not configured.' } }),
        then: (...args) => result.then(...args),
        catch: (...args) => result.catch(...args),
        finally: (...args) => result.finally(...args),
    };
    return query;
}

const noopSupabase = {
    from: () => noopQuery(),
};

export const supabase = supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : noopSupabase;
