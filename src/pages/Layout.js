import { Outlet, Link } from "react-router-dom";
import Logo from '../Logo';
import { useLocation } from 'react-router-dom';


const Layout = () => {
  let location = useLocation();
  return (
    <>
      <nav>
      <Logo/>
        <ul>
          <li>
            <Link to="/" style={ {textShadow: location.pathname === "/" ? "0 0 15px white" : "none"} }>Home</Link>
          </li>
          <li>
            <Link to="/Characters" style={ {textShadow: location.pathname === "/Characters" ? "0 0 15px white" : "none"}} >Characters</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
