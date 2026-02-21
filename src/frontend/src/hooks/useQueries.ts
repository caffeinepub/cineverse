import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Movie, MovieInput, UserProfile } from '../backend';

export function useGetAllMovies() {
  const { actor, isFetching } = useActor();

  return useQuery<Movie[]>({
    queryKey: ['movies'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMovies();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useGetWatchlist() {
  const { actor, isFetching } = useActor();

  return useQuery<Movie[]>({
    queryKey: ['watchlist'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getWatchlist();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddToWatchlist() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (movieId: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addToWatchlist(movieId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watchlist'] });
    },
  });
}

export function useRemoveFromWatchlist() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (movieId: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.removeFromWatchlist(movieId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watchlist'] });
    },
  });
}

export function useAddMovie() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (movie: MovieInput) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addMovie(movie);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
  });
}
