/*
  Warnings:

  - Added the required column `location` to the `Volunteer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Volunteer" DROP CONSTRAINT "Volunteer_projectId_fkey";

-- AlterTable
ALTER TABLE "Volunteer" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "contactPhone" TEXT,
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ADD COLUMN     "medicalLicense" TEXT,
ALTER COLUMN "projectId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Volunteer" ADD CONSTRAINT "Volunteer_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
