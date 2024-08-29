import { Outlet, Link } from "react-router-dom";
import Logo from '../Logo'


const Layout = () => {
  return (
    <>
      <nav>
      <Logo/>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Characters">Characters</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
