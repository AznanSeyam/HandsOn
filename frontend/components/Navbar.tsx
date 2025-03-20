import Link from "next/link";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center">
      <Link href="/">
        <a className="text-white text-lg font-bold">HandsON</a>
      </Link>

      <div>
        {user ? (
          <>
            <span className="text-white mr-4">{user.name}</span>
            <button onClick={logout} className="bg-red-500 px-4 py-2 text-white rounded">
              Logout
            </button>
          </>
        ) : (
          <Link href="/auth/login">
            <a className="text-white">Login</a>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
