/*
  Warnings:

  - You are about to drop the column `name` on the `SavingsGoal` table. All the data in the column will be lost.
  - Added the required column `goalName` to the `SavingsGoal` table without a default value. This is not possible if the table is not empty.
  - Made the column `deadline` on table `SavingsGoal` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "GoalName" AS ENUM ('EMERGENCY_FUND', 'VACATION', 'NEW_GADGET', 'HOME_DOWN_PAYMENT', 'OTHER');

-- AlterTable
ALTER TABLE "SavingsGoal" DROP COLUMN "name",
ADD COLUMN     "goalName" "GoalName" NOT NULL,
ALTER COLUMN "deadline" SET NOT NULL,
ALTER COLUMN "deadline" SET DATA TYPE TEXT;
