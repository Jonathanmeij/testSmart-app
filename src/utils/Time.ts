export function secondsToMinuts(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (remainingSeconds === 0) return `${minutes} Minutes`;
  if (minutes === 0) return `${remainingSeconds} seconds`;

  return `${minutes} Minute${
    minutes > 1 ? "s" : ""
  } ${remainingSeconds} second${remainingSeconds > 1 ? "s" : ""}`;
}
