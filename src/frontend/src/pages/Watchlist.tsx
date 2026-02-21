import { useGetWatchlist } from '../hooks/useQueries';
import { useAuth } from '../hooks/useAuth';
import MovieCard from '../components/MovieCard';
import LoginButton from '../components/LoginButton';
import { Bookmark } from 'lucide-react';

export default function Watchlist() {
  const { data: watchlist = [], isLoading } = useGetWatchlist();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4">
        <Bookmark className="mb-4 h-16 w-16 text-gray-600" />
        <h2 className="mb-2 text-2xl font-bold text-white">Login Required</h2>
        <p className="mb-6 text-center text-gray-400">
          Please login to view your watchlist
        </p>
        <LoginButton />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-4 pt-6">
      <div className="mb-6 flex items-center space-x-3">
        <Bookmark className="h-8 w-8 text-red-600" />
        <h1 className="text-3xl font-bold text-white">My Watchlist</h1>
      </div>

      {watchlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Bookmark className="mb-4 h-16 w-16 text-gray-600" />
          <h2 className="mb-2 text-xl font-bold text-white">Your watchlist is empty</h2>
          <p className="text-gray-400">Add movies to watch them later</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 pb-8">
          {watchlist.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
