/*
  Warnings:

  - You are about to drop the `_TestToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_TestToUser" DROP CONSTRAINT "_TestToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_TestToUser" DROP CONSTRAINT "_TestToUser_B_fkey";

-- DropTable
DROP TABLE "_TestToUser";

-- CreateTable
CREATE TABLE "TestHistory" (
    "id" TEXT NOT NULL,
    "testId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "correct" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TestHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TestHistory" ADD CONSTRAINT "TestHistory_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestHistory" ADD CONSTRAINT "TestHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
