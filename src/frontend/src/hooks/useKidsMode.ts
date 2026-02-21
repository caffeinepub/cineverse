import { useAuth } from './useAuth';
import { useSaveCallerUserProfile } from './useQueries';
import { useCallback } from 'react';

export function useKidsMode() {
  const { userProfile, isAuthenticated } = useAuth();
  const { mutate: saveProfile } = useSaveCallerUserProfile();

  const isKidsMode = userProfile?.isKidsMode || false;

  const toggleKidsMode = useCallback(() => {
    if (!isAuthenticated || !userProfile) return;

    saveProfile({
      ...userProfile,
      isKidsMode: !userProfile.isKidsMode,
    });
  }, [isAuthenticated, userProfile, saveProfile]);

  return {
    isKidsMode,
    toggleKidsMode,
  };
}
