import { LucideMenu } from "lucide-react";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";

const Header = () => {
  return (
    <header className="border-b border-gray-300 p-2 flex items-center justify-between animate-fade-from-top fixed top-0 z-20 w-full bg-background">
      <h1>RBAC Dashboard</h1>

      <SidebarTrigger />
    </header>
  );
};

export default Header;
