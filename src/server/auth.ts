import NextAuth from "next-auth";
import {
  DefaultSession,
  DefaultUser,
  NextAuthOptions,
  getServerSession,
  User as NextAuthUser,
} from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { GetServerSidePropsContext } from "next";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/pages/api/trpc/db";
import { DefaultJWT } from "next-auth/jwt";
import { Role } from "@prisma/client";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      password?: string;
      username: string;
      image: string;
      role: Role;
    };
  }
  interface User extends DefaultUser {
    id: string;
    email: string;
    password?: string;
    username: string;
    image: string;
    role: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: {
      id: string;
      email: string;
      password?: string;
      username: string;
      image: string;
      role: Role;
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
      allowDangerousEmailAccountLinking: false,
    }),
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Missing credentials");
        }

        console.log(prisma);

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          throw new Error("User not found");
        }

        if (user.password !== credentials.password) {
          throw new Error("Incorrect password");
        }
        return user;
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },

  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.user = user;
      }
      return token;
    },

    async session({ session, token, user }) {
      if (token.user) {
        session.user = {
          id: token.user.id,
          email: token.user.email,
          username: token.user.username,
          image: token.user.image,
          role: token.user.role,
        };
      }
      return session;
    },
  },

  pages: {
    signIn: "/",
    newUser: "/signup",
    error: "/",
  },
  secret: process.env.NEXTAUTH_URL ?? "",

  adapter: PrismaAdapter(prisma),
};

export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  const session = getServerSession(ctx.req, ctx.res, authOptions);

  if (!session) {
    return null;
  }

  return session;
};
