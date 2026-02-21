import { useNavigate } from '@tanstack/react-router';
import { Play, Star } from 'lucide-react';
import type { Movie } from '../backend';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate({ to: '/movie/$movieId', params: { movieId: movie.id } })}
      className="group relative flex-shrink-0 overflow-hidden rounded-xl transition-transform hover:scale-105"
    >
      <img
        src={movie.poster.getDirectURL()}
        alt={movie.title}
        className="h-64 w-44 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <div className="mb-2 flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            <span className="text-sm font-medium text-white">{Number(movie.rating)}/10</span>
          </div>
          <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-white">{movie.title}</h3>
          <div className="flex items-center justify-center rounded-full bg-red-600 py-1.5 text-xs font-medium text-white">
            <Play className="mr-1 h-3 w-3" />
            Watch
          </div>
        </div>
      </div>
    </button>
  );
}
