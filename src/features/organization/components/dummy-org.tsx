"use client";
import { Button } from "@/components/ui/button";
import { organization } from "@/lib/auth-client";
import { useState } from "react";

type CreatedOrg = {
  id: string;
  name: string;
  slug: string;
};

const CreateDummyOrg = () => {
  const [orgs, setOrgs] = useState<CreatedOrg[]>([]);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setLoading(true);
    const result = await organization.create({
      name: "Dummy Organization",
      slug: `dummy-org-${Date.now()}`,
    });
    console.log(result); // ← add this
    if (result.data) {
      setOrgs((prev) => [...prev, result.data]);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <Button onClick={handleCreate} disabled={loading}>
        {loading ? "Creating..." : "Create Dummy Org"}
      </Button>
      {orgs.map((org) => (
        <div key={org.id} className="border rounded p-4">
          <h2 className="font-bold">{org.name}</h2>
          <p className="text-sm text-gray-500">{org.slug}</p>
        </div>
      ))}
    </div>
  );
};

export default CreateDummyOrg;
