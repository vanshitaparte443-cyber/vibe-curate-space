import { supabase } from "./supabase";

export async function getUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) return null;
  return user;
}

export async function isLoggedIn() {
  const user = await getUser();
  return !!user;
}