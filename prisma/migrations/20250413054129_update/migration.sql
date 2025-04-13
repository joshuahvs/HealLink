/*
  Warnings:

  - You are about to drop the `ChatbotSession` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `projectId` to the `Volunteer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Volunteer" ADD COLUMN     "projectId" TEXT NOT NULL;

-- DropTable
DROP TABLE "ChatbotSession";

-- AddForeignKey
ALTER TABLE "Volunteer" ADD CONSTRAINT "Volunteer_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
