import type { RolUsuario } from "@prisma/client";
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      rol: RolUsuario;
    };
  }

  interface User {
    id: string;
    rol: RolUsuario;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    rol: RolUsuario;
  }
}
