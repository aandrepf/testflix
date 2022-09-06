export class TestFlixFilters {
  type: string[];
  year: string[];
  metascore: string[];
  actor: string[];
  director: string[];
  genre: string[];
  watched: string;
  saved: string;

  constructor(type, year, metascore, actor, director, genre, watched, saved) {
    this.type = type;
    this.year = year;
    this.metascore = metascore;
    this.actor = actor;
    this.director = director;
    this.genre = genre;
    this.watched = watched;
    this.saved = saved;
  }
}
