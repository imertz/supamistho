import { useOutletContext } from "@remix-run/react";

import type { SupabaseOutletContext } from "~/root";

export default function Login() {
  const { supabase } = useOutletContext<SupabaseOutletContext>();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) console.log("error", error);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log("error", error);
  };
  return (
    <>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleLogin}>Login</button>
    </>
  );
}
