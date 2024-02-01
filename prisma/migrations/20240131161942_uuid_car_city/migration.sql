/*
  Warnings:

  - The required column `car_city_id` was added to the `car_city` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "car_city_car_id_key";

-- DropIndex
DROP INDEX "car_city_city_id_key";

-- AlterTable
ALTER TABLE "car_city" ADD COLUMN     "car_city_id" TEXT NOT NULL,
ADD CONSTRAINT "car_city_pkey" PRIMARY KEY ("car_city_id");
