import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useSaveCallerUserProfile } from '../hooks/useQueries';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function ProfileSetupModal() {
  const { isAuthenticated, userProfile, profileLoading, isFetched } = useAuth();
  const { mutate: saveProfile, isPending } = useSaveCallerUserProfile();
  const [name, setName] = useState('');

  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    saveProfile({
      preferences: [name.trim()],
      isKidsMode: false,
    });
  };

  return (
    <Dialog open={showProfileSetup}>
      <DialogContent className="border-white/10 bg-zinc-950 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome to CineVerse</DialogTitle>
          <DialogDescription className="text-gray-400">
            Let's set up your profile to get started
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="border-white/20 bg-black/50 text-white placeholder:text-gray-500"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={isPending || !name.trim()}
            className="w-full bg-red-600 text-white hover:bg-red-700"
          >
            {isPending ? 'Creating Profile...' : 'Continue'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
