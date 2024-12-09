import { verifyPassword } from "@/lib/hash-utils";
import { sql } from "@vercel/postgres";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig: AuthOptions = {
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        // @ts-expect-error - id is added in the jwt callback
        session.user!.id = token.id;
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const {
          rows: [user],
        } = await sql`
          SELECT m.*, ua.password_hash
          FROM members m
          JOIN user_auth ua ON ua.member_id = m.id
          WHERE m.personal_email = ${credentials.email}
        `;

        if (!user) return null;

        const isValid = await verifyPassword(
          credentials.password,
          user.password_hash
        );
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.school_email,
          name: `${user.first_name} ${user.last_name}`,
        };
      },
    }),
  ],
};

export const { auth, signIn, signOut } = NextAuth(authConfig);
