export class Facets {
  label: string;
  list: any[];
}

export class TestFlixFacets {
  label: string;
  values: TestFlixFiltersCount[];
}

export class TestFlixFiltersCount {
  label: string;
  count: number;
}

export class TestFlix {
  movies: TestFlixMovies;
  actors: TestFlixActors;
  directors: TestFlixDirectors;
}

export class TestFlixMovies {
  label: string;
  filters: MoviesFilters;
}

export class TestFlixActors {
  label: string;
  filters: MoviesFilters;
}

export class TestFlixDirectors {
  label: string;
  filters: TestFlixFacets[];
}

export class MoviesFilters {
  genre: TestFlixFacets;
  metascore: TestFlixFacets;
  saved: TestFlixFacets;
  type: TestFlixFacets;
  watched: TestFlixFacets;
  years: TestFlixFacets;
  movies?: TestFlixFacets;
}

export class TestFlixMoviesInfo {
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  DVD: string;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Production: string;
  Rated: string;
  Ratings: MovieRatings[];
  Released: string;
  Runtime: string;
  Saved: string;
  Title: string;
  Type: string;
  Watched: string;
  Website: string;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
}

export class MovieRatings {
  Source: string;
  Value: string;
}
