"use server";

import { redirect } from "next/navigation";

import { createSupabaseActionClient } from "@/lib/supabase";

export async function logout() {
  const supabase = await createSupabaseActionClient();
  await supabase.auth.signOut();
  redirect("/");
}
