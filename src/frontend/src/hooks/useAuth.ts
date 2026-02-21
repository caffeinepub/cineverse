import { useInternetIdentity } from './useInternetIdentity';
import { useGetCallerUserProfile } from './useQueries';

export function useAuth() {
  const { identity, login, clear, loginStatus, isLoggingIn } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();

  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();

  return {
    identity,
    login,
    logout: clear,
    loginStatus,
    isLoggingIn,
    isAuthenticated,
    userProfile,
    profileLoading,
    isFetched,
    isLoading: loginStatus === 'initializing' || profileLoading,
  };
}
