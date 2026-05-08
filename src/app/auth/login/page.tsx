"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      correo: form.get("correo"),
      clave: form.get("clave"),
      redirect: false
    });
    if (result?.error) {
      setError("Credenciales inválidas o usuario inactivo.");
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center">
      <Card className="w-full p-lg">
        <h1 className="font-titulo-seccion text-titulo-seccion text-primary">Iniciar sesión</h1>
        <p className="mt-xs text-on-surface-variant">Accede a ZonaOscura con tu correo y contraseña.</p>
        <form onSubmit={onSubmit} className="mt-lg flex flex-col gap-md">
          <Input name="correo" type="email" placeholder="correo@zonaoscura.pe" required />
          <Input name="clave" type="password" placeholder="Contraseña" required />
          {error ? <p className="rounded-lg bg-error-container p-sm text-sm text-error">{error}</p> : null}
          <Button type="submit">Entrar</Button>
        </form>
        <Link className="mt-md block text-sm font-semibold text-primary underline" href="/auth/registro">
          Crear cuenta ciudadana
        </Link>
      </Card>
    </div>
  );
}
