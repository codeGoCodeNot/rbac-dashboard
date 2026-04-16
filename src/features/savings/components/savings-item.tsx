import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toCurrency } from "@/utils/currency";
import { User } from "better-auth/types";
import { SavingsGoal } from "../../../../generated/prisma/client";
import { GOAL_NAME_LABELS } from "../constants";
import AddFundsDialog from "./add-funds-dialog";
import SavingsMoreMenu from "./savings-more-menu";

type SavingsItemProps = {
  saving: SavingsGoal;
  percent: number;
  user: User | null | undefined;
};

const SavingsItem = ({ saving, percent, user }: SavingsItemProps) => {
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
              {saving.deadline ? `Deadline: ${saving.deadline}` : "No deadline"}
            </span>
            <div className="flex items-center gap-x-2">
              <span className="font-medium text-green-600">{percent}%</span>
              <AddFundsDialog
                savingsGoalId={saving.id}
                goalName={saving.goalName}
                currentAmount={saving.currentAmount}
                targetAmount={saving.targetAmount}
              />
            </div>
          </div>
        </div>
        <CardAction>
          <SavingsMoreMenu id={saving.id} />
        </CardAction>
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
          {saving.deadline ? `Deadline: ${saving.deadline}` : "No deadline"}
        </span>
      </CardFooter>
    </Card>
  );
};

export default SavingsItem;
