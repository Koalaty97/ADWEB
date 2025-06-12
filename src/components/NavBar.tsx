import { Divider, ListItem } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user } = useAuth();

  return (
    <nav>
      {user ? (
        <>
          <ListItem>
            <NavLink to={"/"}>Home</NavLink>
          </ListItem>
          <ListItem>
            <NavLink to={"/huishoudboekjes"}>Huishoudboekjes</NavLink>
          </ListItem>
          <Divider/>
          <ListItem alignItems='center'>
            <NavLink to={"/logout"}>Uitloggen</NavLink>
          </ListItem>
        </>
      ) : (
        <>
          <ListItem>
            <NavLink to={"/login"}>Login</NavLink>
          </ListItem>
        </>
      )}
    </nav>
  );
};

export default Navbar;