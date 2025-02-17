import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(auth.loggedIn());
  const navigate = useNavigate();

  useEffect(() => {
    // Check login status when component mounts
    setIsLoggedIn(auth.loggedIn());

    // Add event listener for storage changes (in case of login/logout in another tab)
    const handleStorageChange = () => {
      setIsLoggedIn(auth.loggedIn());
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    auth.logout();
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className='nav'>
      <div className='nav-title'>
        <Link to='/'>Krazy Kanban Board</Link>
      </div>
      <ul>
        {!isLoggedIn ? (
          <li className='nav-item'>
            <button type='button'>
              <Link to='/login'>Login</Link>
            </button>
          </li>
        ) : (
          <li className='nav-item'>
            <button 
              type='button' 
              onClick={handleLogout}
              className='logout-btn'
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;