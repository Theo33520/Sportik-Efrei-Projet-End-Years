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
  const cookieStore = cookies();
  const token = (await cookieStore).get("access_token")?.value;
  if (!token) {
    throw new Error("Token not found");
  }
  return token;
}

async function fetchWithAuth<T>(url: string): Promise<T | null> {
  const token = await getAccessToken();

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
      throw new Error(`Erreur API ${url}: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error(`Erreur fetchWithAuth(${url}):`, error);
    return null;
  }
}

export async function getUser(): Promise<UserDto | null> {
  return fetchWithAuth<UserDto>("/user/me");
}

export async function getUserSummary(
  userId: string,
): Promise<TrainingSummaryDto | null> {
  const user = await getUser();
  if (!user || user.role !== "ATHLETE") {
    return null;
  }

  return fetchWithAuth<TrainingSummaryDto>(
    `/trainingSession/dashboardSummary/${userId}`,
  );
}

export async function getListAthlete(userId: string): Promise<UserDto[]> {
  const data = await fetchWithAuth<UserDto[]>(`/club/${userId}/athletes`);
  return data ?? [];
}

export async function getListCoach(userId: string): Promise<UserDto[]> {
  const data = await fetchWithAuth<UserDto[]>(`/club/${userId}/coaches`);
  return data ?? [];
}

export async function getListProgramFromCoach(
  coachId: string,
): Promise<ProgramDto[]> {
  const data = await fetchWithAuth<ProgramDto[]>(`/program/coach/${coachId}`);
  return data ?? [];
}

export async function getListCompetitionFromCoach(
  coachId: string,
): Promise<CompetitionDto[]> {
  const data = await fetchWithAuth<CompetitionDto[]>(
    `/user/competition/coach/${coachId}`,
  );
  return data ?? [];
}

export async function getSummaryCoach(
  coachId: string,
): Promise<UserSummaryDto | null> {
  const user = await getUser();
  if (!user || user.role !== "COACH") {
    return null;
  }
  return fetchWithAuth<UserSummaryDto>(`/user/coach/dashboard/${coachId}`);
}

export async function getDataUser(athleteId: string): Promise<AthleteDto | null> {
  const user = await getUser();
  if (!user || user.role !== "ATHLETE") {
    return null;
  }
  return fetchWithAuth<AthleteDto>(`/user/data/athlete/${athleteId}`);
}