export function formatDuration(minutes: number): string {
  const totalSeconds = Math.floor(minutes * 60);

  const hours = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);

  const paddedMins = mins.toString().padStart(2, "0");

  return `${hours}h ${paddedMins}min`;
}


export function formatSessionDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  const d1 = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()),
  );
  const d2 = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );

  const diffInDays = (d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24);

  if (diffInDays === 0) return "Aujourd'hui";
  if (diffInDays === 1) return "Hier";

  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}