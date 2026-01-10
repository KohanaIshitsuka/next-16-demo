"use server";

import { redirect } from "next/navigation";

import { createSupabaseActionClient } from "@/lib/supabase";

export async function signIn(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    redirect("/login?error=メールアドレスとパスワードを入力してください。");
  }

  const supabase = await createSupabaseActionClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/");
}
