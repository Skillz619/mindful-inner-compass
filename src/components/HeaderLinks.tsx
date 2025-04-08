
import { Link, useLocation } from 'react-router-dom';
import { Settings } from 'lucide-react';

const HeaderLinks = () => {
  const location = useLocation();
  
  const mainLinks = [
    { name: 'Home', path: '/' },
    { name: 'Meditation', path: '/meditation' },
    { name: 'Journal', path: '/journal' },
    { name: 'Breathing', path: '/breathing' },
    { name: 'Virtual Pet', path: '/pet' },
    { name: 'Community', path: '/community' },
    { name: 'Resources', path: '/resources' },
  ];
  
  return (
    <>
      <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
        {mainLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === link.path
                ? 'text-primary'
                : 'text-muted-foreground'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
      
      <div className="hidden md:flex ml-4">
        <Link
          to="/settings"
          className={`text-sm font-medium transition-colors hover:text-primary p-2 rounded-full ${
            location.pathname === '/settings'
              ? 'text-primary bg-muted'
              : 'text-muted-foreground'
          }`}
        >
          <Settings className="h-5 w-5" />
        </Link>
      </div>
    </>
  );
};

export default HeaderLinks;
