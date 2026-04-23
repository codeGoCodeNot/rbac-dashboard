import {
  LucideAlertCircle,
  LucidePlane,
  LucideLaptop,
  LucideHome,
  LucideMoreHorizontal,
  LucideSave,
} from "lucide-react";

export const GOAL_NAME_ICONS = {
  PERSONAL_SAVINGS: <LucideSave />,
  EMERGENCY_FUND: <LucideAlertCircle />,
  VACATION: <LucidePlane />,
  NEW_GADGET: <LucideLaptop />,
  HOME_DOWN_PAYMENT: <LucideHome />,
  OTHER: <LucideMoreHorizontal />,
};

export const GOAL_NAME_LABELS = {
  PERSONAL_SAVINGS: "Personal Savings",
  EMERGENCY_FUND: "Emergency Fund",
  VACATION: "Vacation",
  NEW_GADGET: "New Gadget",
  HOME_DOWN_PAYMENT: "Home Down Payment",
  OTHER: "Other",
};

export const GOAL_STATUS_LABELS = {
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};
