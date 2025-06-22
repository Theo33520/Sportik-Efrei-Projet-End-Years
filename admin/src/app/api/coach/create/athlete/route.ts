import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const cookieStore = cookies();
    const token = (await cookieStore).get("access_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Token d'accès manquant." },
        { status: 401 },
      );
    }

    const responseFromAuth = await fetch(
      "http://localhost:3000/user/register/athlete",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      },
    );

    const data = await responseFromAuth.json();

    if (!responseFromAuth.ok) {
      return NextResponse.json(
        { message: data.message || "Erreur lors de la création de l'athlète" },
        { status: responseFromAuth.status },
      );
    }

    await fetch("http://localhost:3000/mail/send-athlete-credentials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        firstname: payload.firstname,
        lastname: payload.lastname,
      }),
    });

    return NextResponse.json({ user: data });
  } catch {
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
