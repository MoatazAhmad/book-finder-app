import { useTheme } from "../contexts/ThemeContext";
import { useEffect, useRef, useState } from "react";
import useDebounce from "../hooks/useDebounce";
function Header({ onData }) {
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState(""); // State to store input value
  const DSearchQuery = useDebounce(searchQuery, 400);
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value); // Update state with input value
  };

  useEffect(() => {
    if (DSearchQuery && typeof onData === "function") {
      onData(DSearchQuery);
    }
  }, [DSearchQuery, onData]);

  return (
    <>
      <header>
        <div className="header">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search for books..."
              value={searchQuery}
              onChange={handleInputChange}
            />
          </div>
          <button className="theme-toggle" onClick={toggleTheme}>
            Toggle Theme current theme {theme}
          </button>
        </div>
      </header>
    </>
  );
}
export default Header;
