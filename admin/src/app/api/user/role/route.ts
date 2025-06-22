import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getUser } from "@/app/utils/fetchAuth";

export async function GET() {

  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("access_token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Non authentifié" }, { status: 401 });
    }

    const user = await getUser();
    const userId = user?.user_id;
    if (!userId) {
      return NextResponse.json(
        { message: "Utilisateur non trouvé" },
        { status: 404 },
      );
    }

    const url = `http://localhost:3000/user/${userId}/role`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json(
        { message: data.message || "Erreur lors de la récupération du rôle" },
        { status: res.status },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("🔥 Erreur lors de la récupération du rôle :", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
