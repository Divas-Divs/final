import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/art">Art</Link>
      <Link to="/science">Science</Link>
      <Link to="/collection">Collection</Link>
    </nav>
  );
}

export default Nav;