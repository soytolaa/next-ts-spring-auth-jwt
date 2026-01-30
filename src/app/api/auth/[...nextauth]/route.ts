// app/api/auth/[...nextauth]/route.ts

import { loginAction, registerAction } from "@/action/authAction";
import { Users } from "@/types/auth";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { Type } from "@/types/auth";
import { User } from "next-auth";
export const authOptions: AuthOptions = {
  providers: [
    // google provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!, // google client id
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!, // google client secret
      authorization: {
        // authorization params
        params: {
          // authorization params
          prompt: "consent", // prompt user to consent to the scopes
          access_type: "offline", // access type offline
          response_type: "code", // response type code
        },
      },
      allowDangerousEmailAccountLinking: true, // allow user to link their email account to google account
      async profile(profile, account): Promise<User> {
        // profile function to get user profile
        //profile function is called when user sign in with google
        //account is the account object
        try {
          const user = await registerAction({
            email: profile.email,
            password: `${"coocon"}${profile.sub}`,
            userName: profile.name,
            confirmPassword: `${"coocon"}${profile.sub}`,
            type: Type.google,
          });
          if (user.errorMessage) {
            throw new Error(user.errorMessage);
          }
          return {
            id: user.payload.userId.toString(),
            email: user.payload.email,
            name: user.payload.userName,
            accessToken: account?.id_token || "",
          };
        } catch (error) {
          console.error("Google auth error:", error);
          throw error;
        }
      },
    }),
    // credentials provider
    CredentialsProvider({
      name: "credentials", // name of the provider
      credentials: {
        // credentials object
        email: { label: "Email", type: "email" }, // email field
        password: { label: "Password", type: "password" }, // password field
      },
      async authorize(credentials) {
        // authorize function to authenticate user
        //authorize function is called when user sign in with credentials
        //credentials is the credentials object
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }
        try {
          const userData = {
            // user data object
            email: credentials.email,
            password: credentials.password,
          };
          const response = await loginAction(userData); // login action to login user
          if (response.errorMessage) {
            throw new Error(response.errorMessage);
          }
          const user = response.payload as Users; // user object
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
    // github provider
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!, // github client id
      clientSecret: process.env.GITHUB_CLIENT_SECRET!, // github client secret
      allowDangerousEmailAccountLinking: true, // allow user to link their email account to github account
      async profile(profile, account) {
        console.log("$$Profile", profile);
        console.log("$$Account", account);
        //profile function to get user profile
        //profile function is called when user sign in with github
        //account is the account object
        try {
          const user = await registerAction({
            email: profile.email,
            password: `${"coocon"}${profile.id}`,
            userName: profile.name,
            confirmPassword: `${"coocon"}${profile.id}`,
            type: Type.github,
          });
          if (user.errorMessage) {
            throw new Error(user.errorMessage);
          }
          return {
            id: user.payload.userId.toString(),
            email: user.payload.email,
            name: user.payload.userName,
            accessToken: account.access_token || "",
          };
        } catch (error) {
          console.error("Github auth error:", error);
          throw error;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // secret key for the auth
  session: {
    strategy: "jwt", // session strategy
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  callbacks: {
    // callbacks is used to customize the session and jwt
    async jwt({ token, user, account }) {
      // jwt callback to get user token
      //jwt callback is called when user sign in with credentials
      //token is the token object
      //user is the user object
      //account is the account object
      if (account) {
        // if account is not null then set the email and access token
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
      // session callback to get user session
      // session callback to get user session
      //session callback is called when user sign in with credentials
      //session is the session object
      //token is the token object
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
    // pages object
    signIn: "/login", // sign in page
    error: "/login", // error page
  },
  debug: process.env.LOCAL_ENV === "development", // debug mode
};

const nextAuth = NextAuth(authOptions); // handler to handle the auth
export { nextAuth as GET, nextAuth as POST }; // export the handler
