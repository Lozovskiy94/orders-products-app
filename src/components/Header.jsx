import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../store/uiSlice";
import { useEffect, useState } from "react";

const Header = () => {
  const dispatch = useDispatch();

  const searchValue = useSelector((state) => state.ui.searchQuery);
  const activeTabs = useSelector((state) => state.ui.activeTabsCount);

  const [now, setNow] = useState(new Date());


  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <header className="header">
      <div className="logo">INVENTORY</div>

      <input
        className="search"
        type="text"
        placeholder="Поиск"
        value={searchValue}
        onChange={handleChange}
      />

      <div className="header-right">
        <div className="tabs-counter">
          Активных вкладок: {activeTabs}
        </div>

        <div className="datetime">
          {now.toLocaleDateString()} {now.toLocaleTimeString()}
        </div>
      </div>
    </header>
  );
};

export default Header;