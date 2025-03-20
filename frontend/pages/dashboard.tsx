import { useAuth } from "../context/AuthContext";
import Link from "next/link";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-3xl">Welcome, {user?.name}</h1>
      <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>

      <h2 className="text-2xl mt-6">Groups</h2>
      <Link href="/groups/1">
        <a className="text-blue-500">Group 1</a>
      </Link>
    </div>
  );
}
