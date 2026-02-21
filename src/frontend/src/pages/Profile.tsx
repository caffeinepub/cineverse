import { useAuth } from '../hooks/useAuth';
import LoginButton from '../components/LoginButton';
import KidsModeToggle from '../components/KidsModeToggle';
import { User, Settings } from 'lucide-react';

export default function Profile() {
  const { isAuthenticated, userProfile, identity } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4">
        <User className="mb-4 h-16 w-16 text-gray-600" />
        <h2 className="mb-2 text-2xl font-bold text-white">Login Required</h2>
        <p className="mb-6 text-center text-gray-400">
          Please login to view your profile
        </p>
        <LoginButton />
      </div>
    );
  }

  const userName = userProfile?.preferences[0] || 'User';

  return (
    <div className="min-h-screen bg-black px-4 pt-6">
      <div className="mb-8">
        <div className="mb-6 flex items-center space-x-4">
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-red-600 to-purple-600">
            <img
              src="/assets/generated/user-avatar.dim_128x128.png"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{userName}</h1>
            <p className="text-sm text-gray-400">
              {identity?.getPrincipal().toString().slice(0, 10)}...
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="mb-4 flex items-center space-x-2">
          <Settings className="h-5 w-5 text-gray-400" />
          <h2 className="text-xl font-bold text-white">Settings</h2>
        </div>
        <div className="space-y-4">
          <KidsModeToggle />
        </div>
      </div>

      <div className="mb-6">
        <LoginButton />
      </div>

      <div className="rounded-lg border border-white/10 bg-zinc-900 p-4">
        <h3 className="mb-2 font-semibold text-white">About CineVerse</h3>
        <p className="text-sm text-gray-400">
          Your premium streaming destination for movies and entertainment.
        </p>
      </div>
    </div>
  );
}
