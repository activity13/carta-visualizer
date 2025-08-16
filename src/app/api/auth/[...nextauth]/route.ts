import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
// En este archivo estaré practicando mi escritura sin mirar el teclado, aplicando la técnica ubicando los dedos estrictamente en la home row.
// Esta es la función base para la autenticación de NextAuth.js, que permite manejar la autenticación de usuarios en aplicaciones Next.js.

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await connectToDatabase();
        const userFound = await User.findOne({
          $or: [
            { username: credentials?.username },
            { email: credentials?.username },
          ],
        }).select("+password");
        if (!userFound) throw new Error("Usuario o contraseña incorrectos");

        const isPasswordValid = await bcrypt.compare(
          credentials!.password,
          userFound.password
        );

        if (!isPasswordValid)
          throw new Error("Usuario o contraseña incorrectos");

        const user = userFound.toObject();
        delete user.password;

        return user;
      },
    }),
  ],
  session: {
    maxAge: 60 * 60 * 24, // 1 day
  },
  callbacks: {
    jwt({ account, token, user, profile, session }) {
      if (user) token.user = user;
      return token;
    },
    session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
