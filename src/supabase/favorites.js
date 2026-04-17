import { supabase } from "./supabase";

export async function addFavorite(item) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    return supabase.from("favorites").insert({
        user_id: user.id,
        item_id: item.id,
        title: item.title,
        image_url: item.image,
        source: item.source,
    });
}

export async function getFavorites() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

    return data;
}

export async function removeFavorite(favoriteId) {
    return supabase
        .from("favorites")
        .delete()
        .eq("id", favoriteId);
}