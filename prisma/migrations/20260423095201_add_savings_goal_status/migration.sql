-- CreateEnum
CREATE TYPE "GoalStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "SavingsGoal" ADD COLUMN     "goalStatus" "GoalStatus" NOT NULL DEFAULT 'PENDING';
