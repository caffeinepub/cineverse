import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useGetAllMovies } from '../hooks/useQueries';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import type { Movie } from '../backend';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Movie[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { data: movies = [] } = useGetAllMovies();
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim().length > 0) {
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query, movies]);

  const handleSelectMovie = (movieId: string) => {
    navigate({ to: '/movie/$movieId', params: { movieId } });
    setQuery('');
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          className="border-white/20 bg-black/50 py-6 pl-10 pr-10 text-white placeholder:text-gray-500"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setShowSuggestions(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full z-50 mt-2 w-full rounded-lg border border-white/10 bg-zinc-950 shadow-xl">
          {suggestions.map((movie) => (
            <button
              key={movie.id}
              onClick={() => handleSelectMovie(movie.id)}
              className="flex w-full items-center space-x-3 border-b border-white/5 p-3 text-left transition-colors hover:bg-white/5 last:border-b-0"
            >
              <img
                src={movie.poster.getDirectURL()}
                alt={movie.title}
                className="h-16 w-12 rounded object-cover"
              />
              <div className="flex-1">
                <p className="font-medium text-white">{movie.title}</p>
                <p className="text-sm text-gray-400">{movie.categories.join(', ')}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
