/*
  Warnings:

  - You are about to drop the column `tag` on the `Post` table. All the data in the column will be lost.
  - Added the required column `tag_id` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "tag",
ADD COLUMN     "tag_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Tag" (
    "tag_id" SERIAL NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("tag_id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tag"("tag_id") ON DELETE RESTRICT ON UPDATE CASCADE;
