import { Outlet } from '@tanstack/react-router';
import Navigation from './Navigation';

export default function Layout() {
  return (
    <div className="min-h-screen bg-black pb-20">
      <Outlet />
      <Navigation />
    </div>
  );
}
