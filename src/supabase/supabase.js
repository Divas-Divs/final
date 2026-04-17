import { createClient } from "@supabase/supabase-js";

const supaURL = 'https://nsglcvzsqjeonmeixeiv.supabase.co';
const supaKEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zZ2xjdnpzcWplb25tZWl4ZWl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0NTA4NTcsImV4cCI6MjA5MjAyNjg1N30.xi6FlRyf-LQMfqEy_y-rL2Edu6g8G3DXZj8gVOErGz0';

export const supabase = createClient(supaURL, supaKEY, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
    },
});