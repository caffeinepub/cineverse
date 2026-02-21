import { useAuth } from '../hooks/useAuth';
import { useGetAllMovies } from '../hooks/useQueries';
import MovieCard from './MovieCard';
import { Sparkles } from 'lucide-react';

export default function AIRecommendations() {
  const { isAuthenticated, userProfile } = useAuth();
  const { data: movies = [] } = useGetAllMovies();

  if (!isAuthenticated || !userProfile) return null;

  const recommendedMovies = movies.slice(0, 6);

  if (recommendedMovies.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center space-x-2 px-4">
        <Sparkles className="h-5 w-5 text-yellow-500" />
        <h2 className="text-xl font-bold text-white">Recommended for You</h2>
      </div>
      <div className="flex space-x-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
        {recommendedMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
