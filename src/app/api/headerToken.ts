import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]/route";

// Function to get headers with optional authentication token
export async function headerToken(requireAuth = true) {
  // Initialize headers with content type
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // If authentication is required
  if (requireAuth) {
    // Get the current session
    const session = await getServerSession(authOptions);
    // If session exists and has access token, add it to headers
    if (session?.user?.accessToken) {
      headers.Authorization = `Bearer ${session.user.accessToken}`;
    }
  }

  return { headers };
}
