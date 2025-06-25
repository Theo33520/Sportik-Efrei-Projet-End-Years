import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        const responseFromAuth = await fetch("http://api:3000/auth/log-in", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await responseFromAuth.json();
        if (!responseFromAuth.ok) {
            return NextResponse.json(
                { message: data.message || "Identifiants invalides" },
                { status: responseFromAuth.status }
            );
        }
        const response = NextResponse.json({ user: data });
        response.cookies.set("access_token", data.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24,
        });

        return response;
    } catch (error) {
        console.error("Erreur d'authentification :", error);
        return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
    }
}
