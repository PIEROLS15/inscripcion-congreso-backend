/*
  Warnings:

  - A unique constraint covering the columns `[numero]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `numero` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TipoInscripcion` ADD COLUMN `badge` VARCHAR(191) NULL,
    ADD COLUMN `caracteristicas` JSON NULL,
    ADD COLUMN `value` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Usuario` ADD COLUMN `idTipoDocumentoId` VARCHAR(191) NULL,
    ADD COLUMN `numero` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `TipoDocumento` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `abreviatura` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TipoDocumento_abreviatura_key`(`abreviatura`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_numero_key` ON `Usuario`(`numero`);

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_idTipoDocumentoId_fkey` FOREIGN KEY (`idTipoDocumentoId`) REFERENCES `TipoDocumento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
