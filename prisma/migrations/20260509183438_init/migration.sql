-- CreateEnum
CREATE TYPE "RolUsuario" AS ENUM ('CIUDADANO', 'MUNICIPAL', 'ADMIN');

-- CreateEnum
CREATE TYPE "EstadoUsuario" AS ENUM ('ACTIVO', 'INACTIVO');

-- CreateEnum
CREATE TYPE "TipoProblema" AS ENUM ('LUZ_APAGADA', 'SIN_POSTE_LUZ', 'LUMINARIA_INTERMITENTE', 'ZONA_COMPLETAMENTE_OSCURA');

-- CreateEnum
CREATE TYPE "NivelRiesgo" AS ENUM ('BAJO', 'MEDIO', 'ALTO');

-- CreateEnum
CREATE TYPE "EstadoReporte" AS ENUM ('PENDIENTE', 'EN_EVALUACION', 'EN_PROCESO', 'ATENDIDO', 'RECHAZADO');

-- CreateEnum
CREATE TYPE "NivelPrioridad" AS ENUM ('BAJA', 'MEDIA', 'ALTA');

-- CreateEnum
CREATE TYPE "TipoComentario" AS ENUM ('CIUDADANO', 'MUNICIPAL');

-- CreateEnum
CREATE TYPE "TipoIntervencion" AS ENUM ('REPARACION_LUMINARIA', 'CAMBIO_FOCO_LED', 'INSTALACION_POSTE', 'INSPECCION_TECNICA', 'OTRO');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT,
    "correo" TEXT NOT NULL,
    "claveHash" TEXT NOT NULL,
    "rol" "RolUsuario" NOT NULL DEFAULT 'CIUDADANO',
    "estado" "EstadoUsuario" NOT NULL DEFAULT 'ACTIVO',
    "distrito" TEXT,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReporteZonaOscura" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "titulo" TEXT,
    "direccion" TEXT NOT NULL,
    "referencia" TEXT,
    "distrito" TEXT NOT NULL,
    "latitud" DOUBLE PRECISION NOT NULL,
    "longitud" DOUBLE PRECISION NOT NULL,
    "tipoProblema" "TipoProblema" NOT NULL,
    "nivelRiesgo" "NivelRiesgo" NOT NULL,
    "descripcion" TEXT NOT NULL,
    "estado" "EstadoReporte" NOT NULL DEFAULT 'PENDIENTE',
    "prioridad" "NivelPrioridad" NOT NULL DEFAULT 'BAJA',
    "ciudadanoId" TEXT NOT NULL,
    "funcionarioAsignadoId" TEXT,
    "fechaSolucion" TIMESTAMP(3),
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReporteZonaOscura_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImagenReporte" (
    "id" TEXT NOT NULL,
    "reporteId" TEXT NOT NULL,
    "urlImagen" TEXT NOT NULL,
    "claveStorage" TEXT,
    "nombreArchivo" TEXT,
    "tipoArchivo" TEXT,
    "tamanioBytes" INTEGER,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ImagenReporte_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComentarioReporte" (
    "id" TEXT NOT NULL,
    "reporteId" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "tipoComentario" "TipoComentario" NOT NULL DEFAULT 'CIUDADANO',
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ComentarioReporte_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConfirmacionReporte" (
    "id" TEXT NOT NULL,
    "reporteId" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConfirmacionReporte_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistorialEstadoReporte" (
    "id" TEXT NOT NULL,
    "reporteId" TEXT NOT NULL,
    "cambiadoPorId" TEXT NOT NULL,
    "estadoAnterior" "EstadoReporte",
    "estadoNuevo" "EstadoReporte" NOT NULL,
    "nota" TEXT,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HistorialEstadoReporte_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntervencionMunicipal" (
    "id" TEXT NOT NULL,
    "reporteId" TEXT NOT NULL,
    "tipoIntervencion" "TipoIntervencion" NOT NULL,
    "descripcion" TEXT NOT NULL,
    "areaResponsable" TEXT NOT NULL,
    "responsableNombre" TEXT,
    "fechaIntervencion" TIMESTAMP(3) NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IntervencionMunicipal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InformeMunicipal" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "distrito" TEXT,
    "fechaDesde" TIMESTAMP(3),
    "fechaHasta" TIMESTAMP(3),
    "urlArchivo" TEXT,
    "generadoPorId" TEXT NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InformeMunicipal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "Usuario"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "ReporteZonaOscura_codigo_key" ON "ReporteZonaOscura"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "ConfirmacionReporte_reporteId_usuarioId_key" ON "ConfirmacionReporte"("reporteId", "usuarioId");

-- AddForeignKey
ALTER TABLE "ReporteZonaOscura" ADD CONSTRAINT "ReporteZonaOscura_ciudadanoId_fkey" FOREIGN KEY ("ciudadanoId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReporteZonaOscura" ADD CONSTRAINT "ReporteZonaOscura_funcionarioAsignadoId_fkey" FOREIGN KEY ("funcionarioAsignadoId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagenReporte" ADD CONSTRAINT "ImagenReporte_reporteId_fkey" FOREIGN KEY ("reporteId") REFERENCES "ReporteZonaOscura"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComentarioReporte" ADD CONSTRAINT "ComentarioReporte_reporteId_fkey" FOREIGN KEY ("reporteId") REFERENCES "ReporteZonaOscura"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComentarioReporte" ADD CONSTRAINT "ComentarioReporte_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConfirmacionReporte" ADD CONSTRAINT "ConfirmacionReporte_reporteId_fkey" FOREIGN KEY ("reporteId") REFERENCES "ReporteZonaOscura"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConfirmacionReporte" ADD CONSTRAINT "ConfirmacionReporte_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistorialEstadoReporte" ADD CONSTRAINT "HistorialEstadoReporte_reporteId_fkey" FOREIGN KEY ("reporteId") REFERENCES "ReporteZonaOscura"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistorialEstadoReporte" ADD CONSTRAINT "HistorialEstadoReporte_cambiadoPorId_fkey" FOREIGN KEY ("cambiadoPorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntervencionMunicipal" ADD CONSTRAINT "IntervencionMunicipal_reporteId_fkey" FOREIGN KEY ("reporteId") REFERENCES "ReporteZonaOscura"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InformeMunicipal" ADD CONSTRAINT "InformeMunicipal_generadoPorId_fkey" FOREIGN KEY ("generadoPorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
