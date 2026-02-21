import { useGetAllMovies } from '../hooks/useQueries';
import MovieCard from './MovieCard';
import { ChevronRight } from 'lucide-react';

interface CategorySectionProps {
  category: string;
  title: string;
}

export default function CategorySection({ category, title }: CategorySectionProps) {
  const { data: movies = [] } = useGetAllMovies();

  const categoryMovies = movies.filter((movie) =>
    movie.categories.some((cat) => cat.toLowerCase() === category.toLowerCase())
  );

  if (categoryMovies.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center justify-between px-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <ChevronRight className="h-5 w-5 text-gray-400" />
      </div>
      <div className="flex space-x-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
        {categoryMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
