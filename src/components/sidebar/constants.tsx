import {
  contributionsPage,
  homePage,
  organizationPage,
  profilePage,
  savingsPage,
  settingsPage,
} from "@/path";
import {
  LucideCircleUser,
  LucideHome,
  LucidePenLine,
  LucideSave,
  LucideSettings,
  LucideUsers,
} from "lucide-react";

type NavItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
  separator?: boolean;
};

export const navItems: NavItem[] = [
  {
    title: "Home",
    href: homePage(),
    icon: <LucideHome className="text-teal-700" />,
  },
  {
    title: "Savings",
    href: savingsPage(),
    icon: <LucideSave className="text-teal-700" />,
  },
  {
    title: "Contributions",
    href: contributionsPage(),
    icon: <LucidePenLine className="text-orange-700" />,
  },
  {
    separator: true,
    title: "Profile",
    href: profilePage(),
    icon: <LucideCircleUser className="text-blue-700" />,
  },
];
