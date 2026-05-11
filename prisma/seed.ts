import { PrismaClient, RolUsuario } from "@prisma/client";
import bcrypt from "bcryptjs";
import { reportesDemoSeed } from "../src/lib/demoData";

const prisma = new PrismaClient();

async function main() {
  const claveHash = await bcrypt.hash("ZonaOscura2026", 10);

  const ciudadano = await prisma.usuario.upsert({
    where: { correo: "ciudadano@zonaoscura.pe" },
    update: { distrito: "San Juan de Lurigancho" },
    create: {
      nombres: "María",
      apellidos: "Torres",
      correo: "ciudadano@zonaoscura.pe",
      claveHash,
      rol: RolUsuario.CIUDADANO,
      distrito: "San Juan de Lurigancho"
    }
  });

  const vecinos = await Promise.all(
    ["vecino1@zonaoscura.pe", "vecino2@zonaoscura.pe", "vecino3@zonaoscura.pe", "vecino4@zonaoscura.pe", "vecino5@zonaoscura.pe"].map((correo, index) =>
      prisma.usuario.upsert({
        where: { correo },
        update: {},
        create: {
          nombres: ["Luis", "Rosa", "Carmen", "Diego", "Ana"][index],
          apellidos: "Vecinal",
          correo,
          claveHash,
          rol: RolUsuario.CIUDADANO,
          distrito: ["La Victoria", "Comas", "Villa El Salvador", "Ate", "San Juan de Miraflores"][index]
        }
      })
    )
  );

  const municipal = await prisma.usuario.upsert({
    where: { correo: "municipal@zonaoscura.pe" },
    update: { distrito: "Lima" },
    create: { nombres: "Jhan", apellidos: "Pérez", correo: "municipal@zonaoscura.pe", claveHash, rol: RolUsuario.MUNICIPAL, distrito: "Lima" }
  });

  await prisma.usuario.upsert({
    where: { correo: "admin@zonaoscura.pe" },
    update: {},
    create: { nombres: "Admin", apellidos: "ZonaOscura", correo: "admin@zonaoscura.pe", claveHash, rol: RolUsuario.ADMIN }
  });

  for (const item of reportesDemoSeed) {
    const reporte = await prisma.reporteZonaOscura.upsert({
      where: { codigo: item.codigo },
      update: {
        direccion: item.direccion,
        referencia: item.referencia,
        distrito: item.distrito,
        latitud: item.latitud,
        longitud: item.longitud,
        tipoProblema: item.tipoProblema,
        nivelRiesgo: item.nivelRiesgo,
        estado: item.estado,
        prioridad: item.prioridad,
        descripcion: item.descripcion,
        funcionarioAsignadoId: item.estado === "PENDIENTE" ? null : municipal.id,
        fechaSolucion: item.estado === "ATENDIDO" ? new Date("2026-05-19T10:00:00-05:00") : null
      },
      create: {
        codigo: item.codigo,
        direccion: item.direccion,
        referencia: item.referencia,
        distrito: item.distrito,
        latitud: item.latitud,
        longitud: item.longitud,
        tipoProblema: item.tipoProblema,
        nivelRiesgo: item.nivelRiesgo,
        estado: item.estado,
        prioridad: item.prioridad,
        ciudadanoId: ciudadano.id,
        funcionarioAsignadoId: item.estado === "PENDIENTE" ? null : municipal.id,
        fechaSolucion: item.estado === "ATENDIDO" ? new Date("2026-05-19T10:00:00-05:00") : null,
        descripcion: item.descripcion,
        imagenes: {
          create: {
            urlImagen: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=1200&auto=format&fit=crop",
            claveStorage: `seed/${item.codigo}`,
            nombreArchivo: `${item.codigo}.jpg`,
            tipoArchivo: "image/jpeg",
            tamanioBytes: 240000
          }
        },
        historialEstados: {
          create: {
            cambiadoPorId: municipal.id,
            estadoAnterior: null,
            estadoNuevo: item.estado,
            nota: "Ingreso de datos inicial para prototipo municipal."
          }
        }
      }
    });

    const usuariosConfirmacion = [ciudadano, ...vecinos].slice(0, Math.min(item.confirmaciones, vecinos.length + 1));
    for (const usuario of usuariosConfirmacion) {
      await prisma.confirmacionReporte.upsert({
        where: { reporteId_usuarioId: { reporteId: reporte.id, usuarioId: usuario.id } },
        update: {},
        create: { reporteId: reporte.id, usuarioId: usuario.id }
      });
    }
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
