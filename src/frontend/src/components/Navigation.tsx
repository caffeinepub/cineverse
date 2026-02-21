import { Link, useRouterState } from '@tanstack/react-router';
import { Home, Grid3x3, Bookmark, User } from 'lucide-react';

export default function Navigation() {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/categories', icon: Grid3x3, label: 'Categories' },
    { path: '/watchlist', icon: Bookmark, label: 'Watchlist' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-black/95 backdrop-blur-lg">
      <div className="mx-auto flex max-w-md items-center justify-around px-4 py-3">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center space-y-1 transition-colors ${
                isActive ? 'text-red-600' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
