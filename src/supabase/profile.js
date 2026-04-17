import { supabase } from "./supabase";

export async function getProfile(userId) {
    const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

    return data;
}

export async function updateProfile(userId, updates) {
    return supabase
        .from("profiles")
        .update(updates)
        .eq("id", userId);
}