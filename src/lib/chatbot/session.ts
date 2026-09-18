const SESSION_KEY = "konnect-buddy-session";

/** Removes any leftover browser-side Konnect Buddy conversation data. */
export function clearChatSession(): void {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_KEY);
  } catch {
    // Ignore quota or privacy mode errors
  }
}
