import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // Fetch movies from backend (admin + user)
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}/movie`);
  }


  // fetch movie details by movie id (admin + user )
  getMovieDetails (id :string){
    return this.http.get<Movie>(`${this.baseUrl}/movie/${id}`)
  }

  // serch movie by title (user)
   searchMovieBytitle(title:String):Observable<Movie[]>{
    return this.http.get<Movie[]>(`${this.baseUrl}/movie/search?title=${title}`)
   }

  // Search movies by title and id or one of them  (from OMDB) (admin)
  searchMovie(title: string,id:String): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}/admin/movie/search?t=${title}&i=${id}`);
  }

  // Add movie (Admin)
  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.baseUrl}/admin/movie`, movie);
  }

  // Delete movie (Admin)
  deleteMovie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/admin/movie/${id}`);
  }



  // add group of movies (admin)
  addMovies(movies:Movie[]){
    return this.http.post<Movie[]>(`${this.baseUrl}/admin/movie/batch`,movies)
  }


  // delete group of movies (admin)
  deleteMovies(moviesId: Number[]) {
    return this.http.request('DELETE', `${this.baseUrl}/admin/movie/batch`, {
      body: moviesId
    });
  }
}
