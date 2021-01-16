import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';




import { Movie } from './movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  selectedMovie: Movie;
  movies: Movie[];
  readonly baseURL = 'http://localhost:8080/movie';


  constructor(private http: HttpClient) { }


  postMovie(mov: Movie) {
    return this.http.post(this.baseURL, mov);
  }

  getMovieList() {
    return this.http.get(this.baseURL);
  }
  putMovie(mov: Movie) {
    return this.http.put(this.baseURL + `/${mov._id}`, mov);
  }

  deleteMovie(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
 
}
  

