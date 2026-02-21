import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Movie {
    id: MovieId;
    categories: Array<string>;
    title: string;
    cast: Array<string>;
    description: string;
    trailer: ExternalBlob;
    rating: bigint;
    poster: ExternalBlob;
}
export interface MovieInput {
    id: MovieId;
    categories: Array<string>;
    title: string;
    cast: Array<string>;
    description: string;
    trailer: ExternalBlob;
    rating: bigint;
    poster: ExternalBlob;
}
export interface UserProfile {
    preferences: Array<string>;
    isKidsMode: boolean;
}
export type MovieId = string;
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addMovie(movieInput: MovieInput): Promise<void>;
    addToWatchlist(movieId: MovieId): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllMovies(): Promise<Array<Movie>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getWatchlist(): Promise<Array<Movie>>;
    isCallerAdmin(): Promise<boolean>;
    removeFromWatchlist(movieId: MovieId): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
