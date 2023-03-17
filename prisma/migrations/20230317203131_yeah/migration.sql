-- CreateTable
CREATE TABLE "_TestToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TestToUser_AB_unique" ON "_TestToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TestToUser_B_index" ON "_TestToUser"("B");

-- AddForeignKey
ALTER TABLE "_TestToUser" ADD CONSTRAINT "_TestToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Test"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TestToUser" ADD CONSTRAINT "_TestToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
