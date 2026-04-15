import Placeholder from "@/components/placeholder";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "better-auth/types";
import { GOAL_NAME_LABELS } from "../constants";
import getSavings from "../queries/get-savings";
import AddFundsDialog from "./add-funds-dialog";
import { toCurrency } from "@/utils/currency";

type SavingsListProps = {
  user: User | null | undefined;
};

const SavingsList = async ({ user }: SavingsListProps) => {
  if (!user) return <Placeholder label="No Savings found" />;

  const savings = await getSavings(user.id);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {savings.map((saving) => {
        const percent = Math.round(
          (saving.currentAmount / saving.targetAmount) * 100,
        );
        return (
          <Card key={saving.id} className="w-full">
            <CardHeader>
              <div className="flex items-center gap-x-4">
                <Avatar>
                  <AvatarImage
                    src={user?.image ?? undefined}
                    alt={user?.name ?? "User Avatar"}
                    className="grayscale"
                  />
                  <AvatarFallback>
                    {user?.name?.charAt(0).toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">
                    {GOAL_NAME_LABELS[saving.goalName]}
                  </CardTitle>
                  <span>
                    {saving.deadline
                      ? `Deadline: ${saving.deadline}`
                      : "No deadline"}
                  </span>
                  <div className="flex items-center gap-x-2">
                    <span className="font-medium text-green-600">
                      {percent}%
                    </span>
                    <AddFundsDialog
                      savingsGoalId={saving.id}
                      goalName={saving.goalName}
                      currentAmount={saving.currentAmount}
                      targetAmount={saving.targetAmount}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Saved</span>
                <span className="font-medium">
                  {toCurrency(saving.currentAmount)} /{" "}
                  {toCurrency(saving.targetAmount)}
                </span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </CardContent>

            <CardFooter className="flex justify-between text-xs text-muted-foreground">
              <span>
                {saving.deadline
                  ? `Deadline: ${saving.deadline}`
                  : "No deadline"}
              </span>
              <div className="flex items-center gap-x-2">
                <span className="font-medium text-green-600">{percent}%</span>
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default SavingsList;
