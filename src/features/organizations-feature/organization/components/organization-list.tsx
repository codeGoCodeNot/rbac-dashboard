import Link from "next/link";
import getOrganizationByUser from "../queries/get-organization-by-user";
import { organizationDetailsPage } from "@/path";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import getActiveOrganization from "../queries/get-active-organization";
import OrganizationSwitchButton from "./organization-switch-button";
import Placeholder from "@/components/placeholder";

const OrganizationList = async () => {
  const organizations = await getOrganizationByUser();
  const activeOrganization = await getActiveOrganization();

  if (!organizations || organizations.length === 0)
    return (
      <Placeholder label="No organizations yet. Create one to get started." />
    );

  return (
    <div className="flex flex-col gap-y-2 max-w-3xl mx-auto w-full">
      {organizations.map(({ membershipByUser, ...organization }) => (
        <div key={organization.id} className="relative">
          <Link href={organizationDetailsPage(organization.id)}>
            <Card className="hover:bg-muted/50 hover:-translate-x-1 duration-300 ease-out transition-all">
              <CardContent className="flex items-center justify-between p-6 pr-28">
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
                  <Badge variant="secondary" className="text-xs px-2 py-0.5">
                    {membershipByUser?.role}
                  </Badge>
                  <span className="text-muted-foreground">›</span>
                </div>
              </CardContent>
            </Card>
          </Link>
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <OrganizationSwitchButton
              organizationId={organization.id}
              isActive={activeOrganization?.id === organization.id}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrganizationList;
