import type { Provider } from "@supabase/supabase-js";
import { supabase } from "../supabase/client";

export type OAuthProvider = Provider | string;

type SignInOptions = {
  redirect_uri?: string;
  extraParams?: Record<string, string>;
};

export const ozeonix = {
  auth: {
    signInWithOAuth: async (provider: OAuthProvider, opts?: SignInOptions) => {
      const redirectTo = opts?.redirect_uri || (typeof window !== "undefined" ? window.location.origin : undefined);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider as Provider,
        options: {
          redirectTo,
          queryParams: opts?.extraParams,
        },
      });

      if (error) {
        return { error };
      }
      return { data, redirected: true };
    },
  },
};
