import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {

    const cookieStore = cookies();
    const token = (await cookieStore).get("access_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Token d'accès manquant." },
        { status: 401 },
      );
    }

    const responseFromAuth = await fetch(
      "http://api:3000/auth/log-out",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      },
    );

    const data = await responseFromAuth.json();

    if (!responseFromAuth.ok) {
      return NextResponse.json(
        { message: data.message || "Erreur lors de la création du program" },
        { status: responseFromAuth.status },
      );
    }

    return NextResponse.json({ program: data });
  } catch (error) {
    console.error("🔥 Erreur serveur :", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
