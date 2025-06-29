import { useAppDispatch } from "../Redux/store";
import { logout } from "../Redux/auth/LoginSlice";
import { FiLogOut } from "react-icons/fi";

const Header = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-gray-900 text-white shadow">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="text-xl font-bold tracking-wide">
          🗳️ VoterSystem
        </div>

        <nav className="space-x-4">
          <button
            onClick={handleLogout}
            className="flex items-center hover:text-red-400 transition-colors"
          >
            <FiLogOut className="mr-1" /> Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
