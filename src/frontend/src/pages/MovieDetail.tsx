import { useParams, useNavigate } from '@tanstack/react-router';
import { useGetAllMovies, useGetWatchlist, useAddToWatchlist, useRemoveFromWatchlist } from '../hooks/useQueries';
import { useAuth } from '../hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Play, Plus, Check, ArrowLeft, Star } from 'lucide-react';
import { toast } from 'sonner';

export default function MovieDetail() {
  const { movieId } = useParams({ from: '/layout/movie/$movieId' });
  const navigate = useNavigate();
  const { data: movies = [] } = useGetAllMovies();
  const { data: watchlist = [] } = useGetWatchlist();
  const { mutate: addToWatchlist, isPending: isAdding } = useAddToWatchlist();
  const { mutate: removeFromWatchlist, isPending: isRemoving } = useRemoveFromWatchlist();
  const { isAuthenticated } = useAuth();

  const movie = movies.find((m) => m.id === movieId);
  const isInWatchlist = watchlist.some((m) => m.id === movieId);

  if (!movie) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <p className="text-white">Movie not found</p>
      </div>
    );
  }

  const handleWatchlistToggle = () => {
    if (!isAuthenticated) {
      toast.error('Please login to add movies to your watchlist');
      return;
    }

    if (isInWatchlist) {
      removeFromWatchlist(movieId, {
        onSuccess: () => toast.success('Removed from watchlist'),
        onError: () => toast.error('Failed to remove from watchlist'),
      });
    } else {
      addToWatchlist(movieId, {
        onSuccess: () => toast.success('Added to watchlist'),
        onError: () => toast.error('Failed to add to watchlist'),
      });
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="relative h-[500px] w-full">
        <img
          src={movie.poster.getDirectURL()}
          alt={movie.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        <button
          onClick={() => navigate({ to: '/' })}
          className="absolute left-4 top-6 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm hover:bg-black/70"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h1 className="mb-2 text-4xl font-bold text-white">{movie.title}</h1>
          <div className="mb-4 flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
              <span className="text-lg font-semibold text-white">{Number(movie.rating)}/10</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {movie.categories.map((cat) => (
                <span
                  key={cat}
                  className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
          <div className="flex space-x-3">
            <Button className="flex-1 bg-red-600 text-white hover:bg-red-700">
              <Play className="mr-2 h-5 w-5" />
              Watch Now
            </Button>
            <Button
              onClick={handleWatchlistToggle}
              disabled={isAdding || isRemoving}
              variant="outline"
              className="border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
            >
              {isInWatchlist ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      <div className="px-6 py-8">
        <div className="mb-8">
          <h2 className="mb-3 text-xl font-bold text-white">Description</h2>
          <p className="leading-relaxed text-gray-300">{movie.description}</p>
        </div>

        <div className="mb-8">
          <h2 className="mb-3 text-xl font-bold text-white">Cast</h2>
          <div className="flex flex-wrap gap-2">
            {movie.cast.map((actor, index) => (
              <span
                key={index}
                className="rounded-full border border-white/20 bg-zinc-900 px-4 py-2 text-sm text-white"
              >
                {actor}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="mb-3 text-xl font-bold text-white">Trailer</h2>
          <div className="aspect-video w-full overflow-hidden rounded-xl bg-zinc-900">
            <video
              src={movie.trailer.getDirectURL()}
              controls
              className="h-full w-full"
              poster={movie.poster.getDirectURL()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
