import { useAuth } from '../hooks/useAuth';
import MovieCard from './MovieCard';
import { useGetAllMovies } from '../hooks/useQueries';

export default function ContinueWatching() {
  const { isAuthenticated } = useAuth();
  const { data: movies = [] } = useGetAllMovies();

  if (!isAuthenticated || movies.length === 0) return null;

  const continueWatchingMovies = movies.slice(0, 3);

  return (
    <div className="mb-8">
      <h2 className="mb-4 px-4 text-xl font-bold text-white">Continue Watching</h2>
      <div className="flex space-x-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
        {continueWatchingMovies.map((movie) => (
          <div key={movie.id} className="relative">
            <MovieCard movie={movie} />
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
              <div className="h-full w-1/3 bg-red-600" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
