import { cookies } from "next/headers";
import {
  AthleteDto,
  CompetitionDto,
  ProgramDto,
  TrainingSummaryDto,
  UserDto,
  UserSummaryDto,
} from "../../../../api/src/generated/typing";

async function getAccessToken(): Promise<string> {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("access_token")?.value;
    if (!token) {
      throw new Error("Access token not found in cookies");
    }
    return token;
  } catch (error) {
    console.error("Erreur lors de la récupération du token :", error);
    throw error;
  }
}

async function fetchWithAuth<T>(url: string): Promise<T | null> {
  let token: string;
  try {
    token = await getAccessToken();
  } catch (error) {
    console.error("Impossible d'obtenir le token :", error);
    return null;
  }

  try {
    const res = await fetch(`${process.env.API_URL}${url}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (res.status === 404) {
      console.warn(`Ressource non trouvée : ${url}`);
      return null;
    }

    if (!res.ok) {
      console.error(`Erreur HTTP ${res.status} sur ${url}: ${res.statusText}`);
      return null;
    }

    const data = await res.json();
    return data as T;
  } catch (error) {
    console.error(`Erreur réseau sur fetchWithAuth(${url}) :`, error);
    return null;
  }
}

// =======================================
// API WRAPPERS
// =======================================

export async function getUser(): Promise<UserDto | null> {
  return fetchWithAuth<UserDto>("/user/me");
}

export async function getUserSummary(
  userId: string,
): Promise<TrainingSummaryDto | null> {
  try {
    const user = await getUser();
    if (!user) {
      console.warn("Utilisateur introuvable pour le résumé.");
      return null;
    }
    if (user.role !== "ATHLETE") {
      console.warn("Rôle invalide : ce résumé est réservé aux ATHLETEs.");
      return null;
    }

    return fetchWithAuth<TrainingSummaryDto>(
      `/trainingSession/dashboardSummary/${userId}`,
    );
  } catch (error) {
    console.error("Erreur dans getUserSummary :", error);
    return null;
  }
}

export async function getListAthlete(userId: string): Promise<UserDto[]> {
  return (await fetchWithAuth<UserDto[]>(`/club/${userId}/athletes`)) ?? [];
}

export async function getListCoach(userId: string): Promise<UserDto[]> {
  return (await fetchWithAuth<UserDto[]>(`/club/${userId}/coaches`)) ?? [];
}

export async function getListProgramFromCoach(
  coachId: string,
): Promise<ProgramDto[]> {
  return (await fetchWithAuth<ProgramDto[]>(`/program/coach/${coachId}`)) ?? [];
}

export async function getListCompetitionFromCoach(
  coachId: string,
): Promise<CompetitionDto[]> {
  return (
    (await fetchWithAuth<CompetitionDto[]>(
      `/user/competition/coach/${coachId}`,
    )) ?? []
  );
}

export async function getSummaryCoach(
  coachId: string,
): Promise<UserSummaryDto | null> {
  try {
    const user = await getUser();
    if (!user) {
      console.warn("Utilisateur non authentifié");
      return null;
    }

    if (user.role !== "COACH") {
      console.warn("Accès interdit : seul un COACH peut consulter ce résumé");
      return null;
    }

    return await fetchWithAuth<UserSummaryDto>(
      `/user/coach/dashboard/${coachId}`,
    );
  } catch (error) {
    console.error("Erreur dans getSummaryCoach :", error);
    return null;
  }
}

export async function getDataUser(
  athleteId: string,
): Promise<AthleteDto | null> {
  try {
    const user = await getUser();
    if (!user) {
      console.warn("Utilisateur non authentifié");
      return null;
    }

    if (user.role !== "ATHLETE") {
      console.warn(
        "Accès interdit : seul un ATHLETE peut consulter ses données",
      );
      return null;
    }

    return await fetchWithAuth<AthleteDto>(`/user/data/athlete/${athleteId}`);
  } catch (error) {
    console.error("Erreur dans getDataUser :", error);
    return null;
  }
}
