import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser, error, loading } = useSelector((state) => state.user);

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-5">
        <h1 className="font-bold text-lg sm:text-2xl flex flex-wrap">
          <Link to={"/"}>
            <span className="text-slate-500">Matrix</span>
            <span className="text-slate-700">Estates</span>
          </Link>
        </h1>
        <form className="bg-slate-100 p-3 rounded-xl flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-60"
          />
          <FaSearch className="text-slate-600"></FaSearch>
        </form>
        <ul className="flex gap-4">
          <Link to={"/"}>
            <li className="text-slate-700 hidden sm:inline hover:underline">
              Home
            </li>
          </Link>
          <Link to={"/about"}>
            <li className="text-slate-700 hidden sm:inline hover:underline">
              About
            </li>
          </Link>
          <Link to={"/profile"}>
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="profile"
                className="rounded-full h-7 w-7 object-cover"
              />
            ) : (
              <li className="text-slate-700 hover:underline">Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
