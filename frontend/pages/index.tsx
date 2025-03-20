import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import API from "../services/api";
import GroupCard from "../components/GroupCard";

export default function Home() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    API.get("/groups/search?name=")
      .then((res) => setGroups(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold">Groups</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {groups.map((group) => (
            <GroupCard key={group._id} id={group._id} name={group.name} memberCount={group.members.length} />
          ))}
        </div>
      </div>
    </div>
  );
}
