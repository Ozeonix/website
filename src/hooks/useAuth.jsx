import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// Lightweight session + role hook for the partner programme.
export function useAuth() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let active = true;

    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      if (!active) return;
      setSession(s);
    });

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session ?? null);
      setLoading(false);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    let active = true;
    if (!session?.user) {
      setIsAdmin(false);
      return;
    }
    supabase
      .rpc("has_role", { _user_id: session.user.id, _role: "admin" })
      .then(({ data }) => {
        if (active) setIsAdmin(data === true);
      });
    return () => {
      active = false;
    };
  }, [session?.user?.id]);

  return { session, user: session?.user ?? null, loading, isAdmin };
}
