// app/api/auth/[...nextauth]/route.ts

import { loginAction, registerAction } from "@/action/authAction";
import { getUserDetailService } from "@/service/authService";
import { Users } from "@/types/auth";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      allowDangerousEmailAccountLinking: true,
      async profile(profile, account) {
        console.log("@@@Profile@@@", profile);
        const user = await registerAction({
          email: profile.email,
          password: profile.sub || "123456",
          userName: profile.name,
          confirmPassword: profile.sub || "",
          type: "google" as string,
        });
        return {
          id: user.payload.userId.toString(),
          email: user.payload.email,
          name: user.payload.userName,
          accessToken: account?.id_token || "",
        };
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }
        try {
          const userData = {
            email: credentials.email,
            password: credentials.password,
          };
          const response = await loginAction(userData);
          if (response.errorMessage) {
            throw new Error(response.errorMessage);
          }
          const user = response.payload as Users;
          return {
            id: user.userId.toString(),
            email: user.email,
            accessToken: user.accessToken,
          };
        } catch (error) {
          console.error("Auth Error:", error);
          throw new Error(
            error instanceof Error ? error.message : "Authentication failed"
          );
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.email = user.email;
        token.accessToken = (account as any).id_token;
      }
      if (user) {
        token.email = user.email;
        token.accessToken = (user as any).accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          email: token.email,
          accessToken: token.accessToken,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
