import Placeholder from "@/components/placeholder";

import { User } from "better-auth/types";
import getSavings from "../queries/get-savings";
import SavingsItem from "./savings-item";

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
          <SavingsItem
            key={saving.id}
            saving={saving}
            percent={percent}
            user={user}
          />
        );
      })}
    </div>
  );
};

export default SavingsList;
