import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import { RatingService } from '../../services/rating.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
  imports:[NgFor,FormsModule,NgIf,RouterLink]
})
export class UserDashboardComponent implements OnInit {
  movies: Movie[] = [];

  searchedMovies:Movie[]=[];

  searchTitle: String="";

  constructor(
    private movieService: MovieService,
    private ratingService: RatingService
  ) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.movieService.getMovies().subscribe((movies) => (this.movies = movies));
  }

    // Search movie in OMDB API
    searchMovie(): void {
      if (!this.searchTitle.trim()) return;
      this.movieService.searchMovieBytitle(this.searchTitle).subscribe((movies) => {
        if (movies) {
          this.searchedMovies = [...movies];
        }
      });
    }

  // rateMovie(movieId: number, rating: number): void {
  //   this.ratingService.rateMovie(movieId, rating).subscribe(() => {
  //     alert('Rating submitted!');
  //   });
  // }
}
