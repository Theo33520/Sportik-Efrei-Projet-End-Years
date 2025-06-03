import {cookies} from "next/headers";
import { UserDto } from "../../../../api/src/generated/typing";

export async function getUser(): Promise<UserDto> {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;
    if (!token) {
        throw new Error("Token not found");
    }
    const response = await fetch(`http://localhost:3000/user/me`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        cache: 'no-store'
    });

    return await response.json();
}