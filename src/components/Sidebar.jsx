import { NavLink } from 'react-router-dom';
import './Sidebar.css'

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav>
        <NavLink to="/orders">Приход</NavLink>
        <NavLink to="/groups">Группы</NavLink>
        <NavLink to="/products">Продукты</NavLink>
        <NavLink to="/users">Пользователи</NavLink>
        <NavLink to="/settings">Настройки</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;