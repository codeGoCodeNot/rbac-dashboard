import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { LucideArrowRight } from "lucide-react";

type DashboardCardProps = {
  title: string;
  icon: React.ReactNode;
  description: string;
  link: string;
};

const DashboardCard = ({
  title,
  icon,
  description,
  link,
}: DashboardCardProps) => {
  return (
    <Link href={link}>
      <Card className="hover:border-foreground/30 hover:-translate-y-1 duration-300 ease-out transition-all cursor-pointer h-full">
        <CardHeader>
          <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center mb-2">
            {icon}
          </div>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <LucideArrowRight className="w-4 h-4 text-muted-foreground" />
        </CardContent>
      </Card>
    </Link>
  );
};

export default DashboardCard;
