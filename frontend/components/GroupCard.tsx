import Link from "next/link";

interface GroupCardProps {
  id: string;
  name: string;
  memberCount: number;
}

const GroupCard: React.FC<GroupCardProps> = ({ id, name, memberCount }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="text-gray-500">Members: {memberCount}</p>
      <Link href={`/groups/${id}`}>
        <a className="text-blue-500 hover:underline mt-2 block">View Group</a>
      </Link>
    </div>
  );
};

export default GroupCard;
