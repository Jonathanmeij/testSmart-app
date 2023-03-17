-- CreateEnum
CREATE TYPE "difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'General',
ADD COLUMN     "difficulty" "difficulty" NOT NULL DEFAULT 'EASY';
