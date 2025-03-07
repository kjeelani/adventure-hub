import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { User } from "@/types/prisma";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    if (!user) {
      router.push("/");
      return;
    }

    async function fetchUser() {
      var res = await fetch(`/api/users?user_id=${user?.primaryEmailAddress?.emailAddress}`);
      var userData = await res.json();
      if (!userData) {
        // Create new user if not found
        res = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: user?.primaryEmailAddress?.emailAddress,
            username: user?.username || user?.firstName || "Unknown",
            is_admin: false,
            thumbnail_file: null,
            created_at: null,
            updated_at: null,
          } as User),
        });
        userData = await res.json();
      }

      /*
            Load user data and route based on two things:
                1) User Permissions
                2) What Page this auth wrapper is wrapped around

            Later the session being live is also indicative of permissions
        */
      console.log(userData);
      if (userData.is_admin) {
        router.push("/dashboard");
      } else {
        router.push("/waitroom");
      }
      setLoading(false);
    }

    fetchUser();
  }, [isSignedIn, user, router]);

  if (loading) return <p>Loading...</p>;
  return <>{children}</>;
};

export default AuthWrapper;
