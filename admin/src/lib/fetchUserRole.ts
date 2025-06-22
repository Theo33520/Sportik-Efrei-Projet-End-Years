

export interface UserRoleResponse {
  role: string;
}

export async function fetchUserRole(): Promise<string | null> {
  try {
    const response = await fetch("/api/user/role", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user role");
    }

    const data: UserRoleResponse = await response.json();
    return data.role;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du rôle utilisateur :",
      error,
    );
    return null;
  }
}
