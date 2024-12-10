import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function NavBar() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <nav className="bg-slate-950 shadow-md">
      <div className="flex justify-evenly items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <li className="hidden md:inline text-slate-50 hover:underline">
            Home
          </li>
        </Link>
        <Link to="/about">
          <li className="hidden md:inline text-slate-50 hover:underline">
            About us
          </li>
        </Link>
        <Link to="/why_choose_us">
          <li className="hidden md:inline text-slate-50 hover:underline">
            Why choose us?
          </li>
        </Link>
        <Link to="/on_going_projects">
          <li className="hidden md:inline text-slate-50 hover:underline">
            On going projects
          </li>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 p-3 rounded-lg flex items-center"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <Link to="/profile">
          {currentUser ? (
            <img
              className="rounded-full h-7 w-7 object-cover"
              src={currentUser.avatar}
              alt="profile"
            />
          ) : (
            <li className="hidden md:inline text-slate-50 hover:underline">
              {" "}
              Admin Sign in
            </li>
          )}
        </Link>
      </div>
    </nav>
  );
}
