import { Link, NavLink, Outlet } from "react-router-dom";
import "./Layout.css";

const Layout = () => (
  <>
    <header className="header">
      <div className="container">
        <div className="Toolbar">
          <Link to="/" className="Toolbar-logo">
            <span className="header-logo">Admin App</span>
          </Link>
          <nav>
            <ul className="nav-list">
              <li className="NavigationItem">
                <NavLink to="/dishes" >Dishes</NavLink>
              </li>
              <li className="NavigationItem">
                <NavLink to="/orders">Orders</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
    <main className="Layout-Content">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </>
);

export default Layout;
