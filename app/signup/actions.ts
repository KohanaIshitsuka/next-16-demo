"use server";

import { redirect } from "next/navigation";

import { createSupabaseActionClient } from "@/lib/supabase";

export async function signUp(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    redirect("/signup?error=メールアドレスとパスワードを入力してください。");
  }

  const supabase = await createSupabaseActionClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/");
}
