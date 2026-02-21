import { useKidsMode } from '../hooks/useKidsMode';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Baby } from 'lucide-react';

export default function KidsModeToggle() {
  const { isKidsMode, toggleKidsMode } = useKidsMode();

  return (
    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-zinc-900 p-4">
      <div className="flex items-center space-x-3">
        <div className="rounded-full bg-purple-600/20 p-2">
          <Baby className="h-5 w-5 text-purple-400" />
        </div>
        <div>
          <Label htmlFor="kids-mode" className="text-white">
            Kids Mode
          </Label>
          <p className="text-sm text-gray-400">Safe content for children</p>
        </div>
      </div>
      <Switch id="kids-mode" checked={isKidsMode} onCheckedChange={toggleKidsMode} />
    </div>
  );
}
