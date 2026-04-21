import Link from "next/link";
import getOrganizationByUser from "../queries/get-organization-by-user";
import { organizationDetailsPage } from "@/path";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const OrganizationList = async () => {
  const organizations = await getOrganizationByUser();
  return (
    <div className="flex flex-col gap-y-2 max-w-3xl mx-auto w-full">
      {organizations.map(({ membershipByUser, ...organization }) => (
        <Link
          key={organization.id}
          href={organizationDetailsPage(organization.id)}
        >
          <Card className="hover:bg-muted/50 transition-colors">
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-md bg-purple-50 flex items-center justify-center text-base font-medium text-purple-700">
                  {organization.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-base font-medium">{organization.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {organization._count.members} members
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-sm px-3 py-1">
                  {membershipByUser?.role}
                </Badge>
                <span className="text-muted-foreground">›</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default OrganizationList;
