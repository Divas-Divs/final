import { supabase } from "./supabase";

export async function signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        console.error("SIGNUP ERROR:", error);
        throw error;
    }

    const user = data.user;

    console.log("USER FROM SIGNUP:", user);

    if (!user) {
        console.error("No user returned from signup");
        return data;
    }

    const { data: insertData, error: insertError } = await supabase
        .from("profiles")
        .insert({
            id: user.id,
            username: email.split("@")[0],
            bio: "",
        })
        .select();

    console.log("INSERT RESULT:", insertData);
    console.log("INSERT ERROR:", insertError);

    return data;
}

export async function signIn(email, password) {
    return supabase.auth.signInWithPassword({ email, password });
}

export async function signOut() {
    return supabase.auth.signOut();
}

export async function getCurrentUser() {
    const { data } = await supabase.auth.getUser();
    return data.user;
}