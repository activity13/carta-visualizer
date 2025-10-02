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
      async authorize(credentials) {
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
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
    updateAge: 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      // Solo si es la primera vez (cuando el usuario inicia sesión)
      if (user) {
        token.restaurantId = user.restaurantId?.toString();
        token.exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24; // expira en 1 día
      }

      // Si el token ya existe y expira pronto, no lo refresques cada vez
      if (!token.exp) {
        token.exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.restaurantId = token.restaurantId;
      }
      return session;
    },
  },
  pages: {
    signIn: "/backoffice/login",
  },
});

export { handler as GET, handler as POST };
