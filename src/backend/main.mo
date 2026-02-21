import Map "mo:core/Map";
import Set "mo:core/Set";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  // Include Storage System
  include MixinStorage();

  // Initialize Authorization System
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type MovieId = Text;
  type UserId = Principal;

  // Movie Data Structure
  type Movie = {
    id : MovieId;
    title : Text;
    poster : Storage.ExternalBlob;
    rating : Nat;
    cast : [Text];
    description : Text;
    trailer : Storage.ExternalBlob;
    categories : [Text];
  };

  // User Profile Data Structure
  public type UserProfile = {
    preferences : [Text];
    isKidsMode : Bool;
  };

  // Database Structures
  let movies = Map.empty<MovieId, Movie>();
  let userProfiles = Map.empty<UserId, UserProfile>();

  let watchlists = Map.empty<UserId, Set.Set<MovieId>>();

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Movies Management
  public type MovieInput = {
    id : MovieId;
    title : Text;
    poster : Storage.ExternalBlob;
    rating : Nat;
    cast : [Text];
    description : Text;
    trailer : Storage.ExternalBlob;
    categories : [Text];
  };

  module Movie {
    public func compare(movie1 : Movie, movie2 : Movie) : Order.Order {
      Text.compare(movie1.title, movie2.title);
    };
  };

  public shared ({ caller }) func addMovie(movieInput : MovieInput) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add movies");
    };
    movies.add(movieInput.id, movieInput);
  };

  public query ({ caller }) func getAllMovies() : async [Movie] {
    // No authorization check - browsing movies is available to all users including guests
    movies.values().toArray().sort();
  };

  // Watchlist Management
  public shared ({ caller }) func addToWatchlist(movieId : MovieId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add to watchlist");
    };

    // Check if movie exists
    if (not movies.containsKey(movieId)) {
      Runtime.trap("Movie does not exist");
    };

    // Initialize watchlist if not present
    if (not watchlists.containsKey(caller)) {
      watchlists.add(caller, Set.empty<MovieId>());
    };

    switch (watchlists.get(caller)) {
      case (null) { Runtime.trap("Failed to fetch watchlist") };
      case (?watchlist) {
        watchlist.add(movieId);
      };
    };
  };

  public shared ({ caller }) func removeFromWatchlist(movieId : MovieId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can remove from watchlist");
    };

    switch (watchlists.get(caller)) {
      case (null) { Runtime.trap("Watchlist not found") };
      case (?watchlist) {
        watchlist.remove(movieId);
      };
    };
  };

  public query ({ caller }) func getWatchlist() : async [Movie] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view watchlist");
    };

    switch (watchlists.get(caller)) {
      case (null) { [] };
      case (?watchlist) {
        watchlist.values().toArray().map(
          func(movieId) {
            switch (movies.get(movieId)) {
              case (?movie) { movie };
              case (null) { Runtime.trap("Movie not found") };
            };
          }
        );
      };
    };
  };
};
