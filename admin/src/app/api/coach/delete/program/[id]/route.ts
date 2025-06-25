import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const token = (await cookies()).get("access_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Token d'accès manquant." },
        { status: 401 },
      );
    }

    const programId = params.id;

    const responseFromAuth = await fetch(
      `http://api:3000/program/delete/${programId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await responseFromAuth.json();

    if (!responseFromAuth.ok) {
      return NextResponse.json(
        {
          message: data.message || "Erreur lors de la suppression du programme",
        },
        { status: responseFromAuth.status },
      );
    }

    return NextResponse.json({ program: data });
  } catch (error) {
    console.error("🔥 Erreur serveur :", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
