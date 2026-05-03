type MembershipListProps = {
  organizationId: string;
};

const MembershipList = ({ organizationId }: MembershipListProps) => {
  return <div>Membership List for organization {organizationId}</div>;
};

export default MembershipList;
