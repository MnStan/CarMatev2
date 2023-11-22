-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "privilege_id" INTEGER NOT NULL,
    "user_info_id" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL,
    "creation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "User_info" (
    "user_info_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "User_info_pkey" PRIMARY KEY ("user_info_id")
);

-- CreateTable
CREATE TABLE "User_city_info" (
    "user_info_id" INTEGER NOT NULL,
    "city_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "City" (
    "city_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("city_id")
);

-- CreateTable
CREATE TABLE "Car" (
    "car_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "car_info_id" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,
    "creation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("car_id")
);

-- CreateTable
CREATE TABLE "car_city" (
    "car_id" INTEGER NOT NULL,
    "city_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Car_info" (
    "car_info_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "directory_url" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,

    CONSTRAINT "Car_info_pkey" PRIMARY KEY ("car_info_id")
);

-- CreateTable
CREATE TABLE "Privilege" (
    "privilege_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Privilege_pkey" PRIMARY KEY ("privilege_id")
);

-- CreateTable
CREATE TABLE "Photo" (
    "photo_id" SERIAL NOT NULL,
    "car_info_id" INTEGER NOT NULL,
    "photo_url" TEXT NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("photo_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_city_info_user_info_id_key" ON "User_city_info"("user_info_id");

-- CreateIndex
CREATE UNIQUE INDEX "car_city_car_id_key" ON "car_city"("car_id");

-- CreateIndex
CREATE UNIQUE INDEX "car_city_city_id_key" ON "car_city"("city_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_privilege_id_fkey" FOREIGN KEY ("privilege_id") REFERENCES "Privilege"("privilege_id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
