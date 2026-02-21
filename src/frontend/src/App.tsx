import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import SplashScreen from './components/SplashScreen';
import Layout from './components/Layout';
import Home from './pages/Home';
import Categories from './pages/Categories';
import MovieDetail from './pages/MovieDetail';
import Watchlist from './pages/Watchlist';
import Profile from './pages/Profile';
import ProfileSetupModal from './components/ProfileSetupModal';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster />
    </>
  ),
});

const splashRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/splash',
  component: SplashScreen,
});

const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'layout',
  component: Layout,
});

const homeRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/',
  component: Home,
});

const categoriesRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/categories',
  component: Categories,
});

const movieDetailRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/movie/$movieId',
  component: MovieDetail,
});

const watchlistRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/watchlist',
  component: Watchlist,
});

const profileRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/profile',
  component: Profile,
});

const routeTree = rootRoute.addChildren([
  splashRoute,
  layoutRoute.addChildren([homeRoute, categoriesRoute, movieDetailRoute, watchlistRoute, profileRoute]),
]);

const router = createRouter({ routeTree, defaultPreload: 'intent' });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      router.navigate({ to: '/' });
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <ProfileSetupModal />
      {showSplash ? <SplashScreen /> : <RouterProvider router={router} />}
    </ThemeProvider>
  );
}
