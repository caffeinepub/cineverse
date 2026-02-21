import { useEffect, useState } from 'react';

export default function SplashScreen() {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-black via-zinc-950 to-black transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center space-y-6 animate-in fade-in zoom-in duration-700">
        <img
          src="/assets/generated/cineverse-logo.dim_512x512.png"
          alt="CineVerse"
          className="h-32 w-32 object-contain"
        />
        <h1 className="text-4xl font-bold tracking-wider text-white">CineVerse</h1>
        <div className="h-1 w-24 bg-gradient-to-r from-transparent via-red-600 to-transparent animate-pulse" />
      </div>
    </div>
  );
}
