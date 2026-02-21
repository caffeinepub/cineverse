import { useNavigate } from '@tanstack/react-router';
import { Film } from 'lucide-react';

const categories = [
  { id: 'action', name: 'Action', color: 'from-red-600 to-orange-600', image: '/assets/generated/movie-action-1.dim_300x450.png' },
  { id: 'comedy', name: 'Comedy', color: 'from-yellow-600 to-amber-600', image: '/assets/generated/movie-comedy-1.dim_300x450.png' },
  { id: 'kids', name: 'Kids', color: 'from-purple-600 to-pink-600', image: '/assets/generated/movie-kids-1.dim_300x450.png' },
  { id: 'bollywood', name: 'Bollywood', color: 'from-green-600 to-emerald-600', image: '/assets/generated/movie-bollywood-1.dim_300x450.png' },
  { id: 'hollywood', name: 'Hollywood', color: 'from-blue-600 to-cyan-600', image: '/assets/generated/movie-hollywood-1.dim_300x450.png' },
];

export default function Categories() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black px-4 pt-6">
      <div className="mb-6 flex items-center space-x-3">
        <Film className="h-8 w-8 text-red-600" />
        <h1 className="text-3xl font-bold text-white">Categories</h1>
      </div>

      <div className="grid grid-cols-2 gap-4 pb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => navigate({ to: '/' })}
            className="group relative overflow-hidden rounded-2xl"
          >
            <div className="aspect-[3/4] w-full">
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover transition-transform group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-xl font-bold text-white">{category.name}</h3>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
