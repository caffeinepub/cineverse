import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useGetAllMovies } from '../hooks/useQueries';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TrendingCarousel() {
  const { data: movies = [] } = useGetAllMovies();
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const trendingMovies = movies.slice(0, 5);

  useEffect(() => {
    if (trendingMovies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % trendingMovies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [trendingMovies.length]);

  if (trendingMovies.length === 0) {
    return (
      <div className="relative h-64 w-full animate-pulse rounded-2xl bg-zinc-900" />
    );
  }

  const currentMovie = trendingMovies[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + trendingMovies.length) % trendingMovies.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % trendingMovies.length);
  };

  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-2xl">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url(${currentMovie.poster.getDirectURL()})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end p-6">
        <h2 className="mb-2 text-3xl font-bold text-white">{currentMovie.title}</h2>
        <p className="mb-4 line-clamp-2 max-w-2xl text-sm text-gray-300">
          {currentMovie.description}
        </p>
        <div className="flex items-center space-x-3">
          <Button
            onClick={() => navigate({ to: '/movie/$movieId', params: { movieId: currentMovie.id } })}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            <Play className="mr-2 h-5 w-5" />
            Watch Now
          </Button>
          <div className="flex space-x-2">
            {trendingMovies.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentIndex ? 'w-8 bg-red-600' : 'w-1.5 bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}
