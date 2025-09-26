/*
  Warnings:

  - You are about to drop the column `metodoDepositoId` on the `Inscripcion` table. All the data in the column will be lost.
  - You are about to drop the column `tipoPagoId` on the `Inscripcion` table. All the data in the column will be lost.
  - You are about to drop the column `voucherId` on the `Inscripcion` table. All the data in the column will be lost.
  - You are about to alter the column `precio` on the `TipoInscripcion` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - You are about to drop the `MetodoDeposito` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TipoPago` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Voucher` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[numeroOperacion]` on the table `Inscripcion` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fechaPago` to the `Inscripcion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numeroOperacion` to the `Inscripcion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pago` to the `Inscripcion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `institutionalPrice` to the `TipoInscripcion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoPlanId` to the `TipoInscripcion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Inscripcion` DROP FOREIGN KEY `Inscripcion_metodoDepositoId_fkey`;

-- DropForeignKey
ALTER TABLE `Inscripcion` DROP FOREIGN KEY `Inscripcion_tipoPagoId_fkey`;

-- DropForeignKey
ALTER TABLE `Inscripcion` DROP FOREIGN KEY `Inscripcion_voucherId_fkey`;

-- DropForeignKey
ALTER TABLE `TipoPago` DROP FOREIGN KEY `TipoPago_metodoDepositoId_fkey`;

-- DropIndex
DROP INDEX `Inscripcion_metodoDepositoId_fkey` ON `Inscripcion`;

-- DropIndex
DROP INDEX `Inscripcion_tipoPagoId_fkey` ON `Inscripcion`;

-- DropIndex
DROP INDEX `Inscripcion_voucherId_fkey` ON `Inscripcion`;

-- AlterTable
ALTER TABLE `Inscripcion` DROP COLUMN `metodoDepositoId`,
    DROP COLUMN `tipoPagoId`,
    DROP COLUMN `voucherId`,
    ADD COLUMN `bancoSeleccionado` VARCHAR(191) NULL,
    ADD COLUMN `billeteraDigital` VARCHAR(191) NULL,
    ADD COLUMN `descuento` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    ADD COLUMN `esEmailInstitucional` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `fechaPago` DATETIME(3) NOT NULL,
    ADD COLUMN `file` VARCHAR(191) NULL,
    ADD COLUMN `hasDiscount` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `modalidadDeposito` VARCHAR(191) NULL,
    ADD COLUMN `numeroOperacion` VARCHAR(191) NOT NULL,
    ADD COLUMN `pago` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `tipoOperacion` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `TipoInscripcion` ADD COLUMN `institutionalPrice` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `tipoPlanId` INTEGER NOT NULL,
    MODIFY `precio` DECIMAL(65, 30) NOT NULL;

-- DropTable
DROP TABLE `MetodoDeposito`;

-- DropTable
DROP TABLE `TipoPago`;

-- DropTable
DROP TABLE `Voucher`;

-- CreateTable
CREATE TABLE `TipoPlanInscripcion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `caracteristicas` JSON NULL,
    `precioDesde` DECIMAL(65, 30) NULL,

    UNIQUE INDEX `TipoPlanInscripcion_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Inscripcion_numeroOperacion_key` ON `Inscripcion`(`numeroOperacion`);

-- AddForeignKey
ALTER TABLE `TipoInscripcion` ADD CONSTRAINT `TipoInscripcion_tipoPlanId_fkey` FOREIGN KEY (`tipoPlanId`) REFERENCES `TipoPlanInscripcion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
