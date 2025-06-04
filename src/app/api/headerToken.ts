import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]/route";

export async function headerToken(requireAuth = true) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (requireAuth) {
    const session = await getServerSession(authOptions);
    if (session?.user?.accessToken) {
      headers.Authorization = `Bearer ${session.user.accessToken}`;
    }
  }

  return { headers };
}
