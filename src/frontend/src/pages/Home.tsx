import { useKidsMode } from '../hooks/useKidsMode';
import SearchBar from '../components/SearchBar';
import TrendingCarousel from '../components/TrendingCarousel';
import CategorySection from '../components/CategorySection';
import ContinueWatching from '../components/ContinueWatching';
import AIRecommendations from '../components/AIRecommendations';

export default function Home() {
  const { isKidsMode } = useKidsMode();

  return (
    <div className="min-h-screen bg-black">
      {isKidsMode && (
        <div className="relative mb-6 overflow-hidden rounded-b-3xl bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 p-6 text-center">
          <h2 className="text-2xl font-bold text-white">🎈 Kids Mode Active 🎈</h2>
          <p className="text-sm text-white/90">Safe and fun content for you!</p>
        </div>
      )}

      <div className="px-4 pt-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">CineVerse</h1>
        </div>

        <div className="mb-6">
          <SearchBar />
        </div>

        <div className="mb-6">
          <TrendingCarousel />
        </div>
      </div>

      {!isKidsMode && <ContinueWatching />}
      {!isKidsMode && <AIRecommendations />}

      {isKidsMode ? (
        <CategorySection category="Kids" title="Kids Movies" />
      ) : (
        <>
          <CategorySection category="Action" title="Action Movies" />
          <CategorySection category="Comedy" title="Comedy Movies" />
          <CategorySection category="Kids" title="Family & Kids" />
          <CategorySection category="Bollywood" title="Bollywood Hits" />
          <CategorySection category="Hollywood" title="Hollywood Blockbusters" />
        </>
      )}

      <footer className="mt-12 border-t border-white/10 bg-zinc-950 px-4 py-8 text-center">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} CineVerse. Built with ❤️ using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              window.location.hostname
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
