import { useEffect, useState } from "react";
import { fetchUserRole } from "../fetchUserRole";

export function useUserRole() {
  const [userRole, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const r = await fetchUserRole();
      setRole(r);
      setLoading(false);
    };

    load();
  }, []);

  return { userRole, loading };
}