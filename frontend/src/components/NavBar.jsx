import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function NavBar() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  // Add event listener to handle screen resizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false); // Close mobile menu on desktop size
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About us", path: "/about" },
    { name: "Why choose us?", path: "/why_choose_us" },
    { name: "On going projects", path: "/on_going_projects" },
    { name: "form" },
  ];

  const renderMenuItems = () =>
    menuItems.map((item) => (
      <>
        {item?.name === "form" ? (
          <form
            onSubmit={handleSubmit}
            className="bg-slate-100 p-3 rounded-lg flex items-center text-slate-950"
          >
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <FaSearch className="text-slate-600" />
            </button>
          </form>
        ) : (
          <Link
            to={item.path}
            key={item.name}
            className="hover:underline"
            onClick={() => setIsMenuOpen(false)}
          >
            {item.name}
          </Link>
        )}
      </>
    ));

  return (
    <nav className="bg-slate-950 shadow-md">
      <div className="flex justify-evenly p-3">
        {/* Hamburger Icon */}
        <button
          className="text-slate-50 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center text-slate-50">
          {renderMenuItems()}
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <a className=" text-slate-50 hover:underline"> Admin Sign in</a>
            )}
          </Link>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="md:hidden bg-slate-950 text-slate-50 p-3 flex flex-col space-y-4">
          {renderMenuItems()}
        </ul>
      )}
    </nav>
  );
}
