import { redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { registrarUsuario } from "@/features/auth/auth.service";

async function registrar(formData: FormData) {
  "use server";
  await registrarUsuario({
    nombres: String(formData.get("nombres") ?? ""),
    apellidos: String(formData.get("apellidos") ?? ""),
    correo: String(formData.get("correo") ?? ""),
    clave: String(formData.get("clave") ?? ""),
    distrito: String(formData.get("distrito") ?? "")
  });
  redirect("/auth/login");
}

export default function RegistroPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg items-center">
      <Card className="w-full p-lg">
        <h1 className="font-titulo-seccion text-titulo-seccion text-primary">Registro ciudadano</h1>
        <form action={registrar} className="mt-lg grid grid-cols-1 gap-md sm:grid-cols-2">
          <Input name="nombres" placeholder="Nombres" required />
          <Input name="apellidos" placeholder="Apellidos" />
          <Input className="sm:col-span-2" name="correo" type="email" placeholder="Correo" required />
          <Input className="sm:col-span-2" name="clave" type="password" placeholder="Contraseña" required />
          <Input className="sm:col-span-2" name="distrito" placeholder="Distrito" />
          <Button className="sm:col-span-2" type="submit">Crear cuenta</Button>
        </form>
      </Card>
    </div>
  );
}
