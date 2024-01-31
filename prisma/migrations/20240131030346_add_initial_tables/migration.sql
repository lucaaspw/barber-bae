/*
  Warnings:

  - You are about to drop the column `barbershopId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `babershopId` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the `BarberShop` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `babershopId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `barbershopId` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_barbershopId_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_babershopId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "barbershopId",
DROP COLUMN "data",
ADD COLUMN     "babershopId" TEXT NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "babershopId",
ADD COLUMN     "barbershopId" TEXT NOT NULL;

-- DropTable
DROP TABLE "BarberShop";

-- CreateTable
CREATE TABLE "Barbershop" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "Barbershop_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "Barbershop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_babershopId_fkey" FOREIGN KEY ("babershopId") REFERENCES "Barbershop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
