"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { getUser } from "../utils/fetchAuth";
import api from "../core/client";

export async function updateUserAction(formData: FormData) {
  const user = await getUser();

  const updatedUser = {
    firstname: formData.get("firstname")?.toString() || "",
    lastname: formData.get("lastname")?.toString() || "",
    email: formData.get("email")?.toString() || "",
  };

  if (!updatedUser.firstname || !updatedUser.lastname || !updatedUser.email) {
    throw new Error("Tous les champs sont requis.");
  }

  const cookieStore = cookies();
  const token = (await cookieStore).get("access_token")?.value;

  if (!token) {
    throw new Error("Token d'accès manquant.");
  }

  await api.user.updateUser(user.user_id, updatedUser, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  revalidatePath("/profil");
}
