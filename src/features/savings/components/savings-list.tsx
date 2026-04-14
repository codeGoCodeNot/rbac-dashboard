import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "better-auth/types";

type SavingsListProps = {
  user: User | null;
};

const SavingsList = ({ user }: SavingsListProps) => {
  const savings = [
    {
      id: "1",
      name: "Juan dela Cruz",
      goalName: "Emergency Fund",
      targetAmount: 50000,
      currentAmount: 10000,
      deadline: "2026-12-31",
    },
    {
      id: "2",
      name: "Maria Santos",
      goalName: "Vacation",
      targetAmount: 20000,
      currentAmount: 5000,
      deadline: "2026-08-01",
    },
    {
      id: "3",
      name: "Jose Reyes",
      goalName: "New Laptop",
      targetAmount: 80000,
      currentAmount: 0,
      deadline: null,
    },
    {
      id: "4",
      name: "Ana Gomez",
      goalName: "Wedding",
      targetAmount: 200000,
      currentAmount: 50000,
      deadline: "2027-02-14",
    },
  ];

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
                  <CardTitle className="text-base">{saving.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {saving.goalName}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Saved</span>
                <span className="font-medium">
                  ₱{saving.currentAmount.toLocaleString()} / ₱
                  {saving.targetAmount.toLocaleString()}
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
              <span className="font-medium text-green-600">{percent}%</span>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default SavingsList;
