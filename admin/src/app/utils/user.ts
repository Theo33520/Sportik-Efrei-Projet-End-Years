import {cookies} from "next/headers";
import { UserDto } from "../../../../api/src/generated/typing";


export async function getUser(): Promise<UserDto> {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;
    if (!token) {
        throw new Error("Token not found");
    }
    const response = await fetch(`${process.env.API_URL}/user/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    return await response.json();
}

export async function getUserSummary(userId: string) {
  const res = await fetch(
    `${process.env.API_URL}/trainingSession/dashboardSummary/${userId}`,
  );

  if (!res.ok) {
    throw new Error("Échec de récupération du résumé de l'utilisateur");
  }
  return res.json();
}