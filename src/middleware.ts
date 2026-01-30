import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session } from "next-auth";
export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const session = (await getServerSession(authOptions as any)) as Session & {
    user: {
      accessToken?: string;
    };
  };
  if (!session?.user?.accessToken) {
    return NextResponse.redirect(new URL("/login", request.url).toString());
  }
  
  // Add pathname to headers for server components
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);
  
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = { matcher: ["/(dashboard)/:path*"] };
