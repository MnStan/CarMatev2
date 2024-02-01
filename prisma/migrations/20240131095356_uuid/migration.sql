/*
  Warnings:

  - The primary key for the `Car` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Car_info` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `City` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Photo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User_info` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_car_info_id_fkey";

-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_car_info_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_user_info_id_fkey";

-- DropForeignKey
ALTER TABLE "User_city_info" DROP CONSTRAINT "User_city_info_city_id_fkey";

-- DropForeignKey
ALTER TABLE "User_city_info" DROP CONSTRAINT "User_city_info_user_info_id_fkey";

-- DropForeignKey
ALTER TABLE "car_city" DROP CONSTRAINT "car_city_car_id_fkey";

-- DropForeignKey
ALTER TABLE "car_city" DROP CONSTRAINT "car_city_city_id_fkey";

-- AlterTable
ALTER TABLE "Car" DROP CONSTRAINT "Car_pkey",
ALTER COLUMN "car_id" DROP DEFAULT,
ALTER COLUMN "car_id" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ALTER COLUMN "car_info_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Car_pkey" PRIMARY KEY ("car_id");
DROP SEQUENCE "Car_car_id_seq";

-- AlterTable
ALTER TABLE "Car_info" DROP CONSTRAINT "Car_info_pkey",
ALTER COLUMN "car_info_id" DROP DEFAULT,
ALTER COLUMN "car_info_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Car_info_pkey" PRIMARY KEY ("car_info_id");
DROP SEQUENCE "Car_info_car_info_id_seq";

-- AlterTable
ALTER TABLE "City" DROP CONSTRAINT "City_pkey",
ALTER COLUMN "city_id" DROP DEFAULT,
ALTER COLUMN "city_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "City_pkey" PRIMARY KEY ("city_id");
DROP SEQUENCE "City_city_id_seq";

-- AlterTable
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_pkey",
ALTER COLUMN "photo_id" DROP DEFAULT,
ALTER COLUMN "photo_id" SET DATA TYPE TEXT,
ALTER COLUMN "car_info_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Photo_pkey" PRIMARY KEY ("photo_id");
DROP SEQUENCE "Photo_photo_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "user_id" DROP DEFAULT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ALTER COLUMN "user_info_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("user_id");
DROP SEQUENCE "User_user_id_seq";

-- AlterTable
ALTER TABLE "User_city_info" ALTER COLUMN "user_info_id" SET DATA TYPE TEXT,
ALTER COLUMN "city_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User_info" DROP CONSTRAINT "User_info_pkey",
ALTER COLUMN "user_info_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_info_pkey" PRIMARY KEY ("user_info_id");

-- AlterTable
ALTER TABLE "car_city" ALTER COLUMN "car_id" SET DATA TYPE TEXT,
ALTER COLUMN "city_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_user_info_id_fkey" FOREIGN KEY ("user_info_id") REFERENCES "User_info"("user_info_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_city_info" ADD CONSTRAINT "User_city_info_user_info_id_fkey" FOREIGN KEY ("user_info_id") REFERENCES "User_info"("user_info_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_city_info" ADD CONSTRAINT "User_city_info_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("city_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_car_info_id_fkey" FOREIGN KEY ("car_info_id") REFERENCES "Car_info"("car_info_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car_city" ADD CONSTRAINT "car_city_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Car"("car_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car_city" ADD CONSTRAINT "car_city_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("city_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_car_info_id_fkey" FOREIGN KEY ("car_info_id") REFERENCES "Car_info"("car_info_id") ON DELETE RESTRICT ON UPDATE CASCADE;
