import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/auth/login" },
  providers: [
    CredentialsProvider({
      name: "Credenciales",
      credentials: {
        correo: { label: "Correo", type: "email" },
        clave: { label: "Clave", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.correo || !credentials?.clave) return null;
        const usuario = await prisma.usuario.findUnique({ where: { correo: credentials.correo } });
        if (!usuario || usuario.estado !== "ACTIVO") return null;
        const valido = await bcrypt.compare(credentials.clave, usuario.claveHash);
        if (!valido) return null;

        return {
          id: usuario.id,
          name: `${usuario.nombres} ${usuario.apellidos ?? ""}`.trim(),
          email: usuario.correo,
          rol: usuario.rol
        };
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.rol = user.rol;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.rol = token.rol;
      }
      return session;
    }
  }
};
