import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  imports: [NgFor, FormsModule , NgIf,RouterLink,NgClass],
})
export class AdminDashboardComponent implements OnInit {
  movies: Movie[] = [];

  OMDSearchedMovies :Movie[]=[];
  searchTitle: any = null;
  movieId:any=null;

  searchTitleUser:String='';

  selectedMovies:number[]=[]

  selectedMoviesFromSearch:Movie[]=[]

  select_all:boolean = true;


  select_all_search:boolean = true

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  // Load movies from database
  loadMovies(): void {
    this.movieService.getMovies().subscribe((movies) => (this.movies = movies));
  }

  // Search movie in OMDB API
  searchMovie(): void {
    // if (!this.searchTitle.trim()) return;
    console.log(this.searchTitle,this.movieId);

    this.movieService.searchMovie(this.searchTitle,this.movieId).subscribe((movies) => {
      if (movies) {
        console.log(movies);

        this.OMDSearchedMovies=[...movies];
      }
    });
  }

  // Add movie to database
  addMovie(movie: Movie): void {
    this.movieService.addMovie(movie).subscribe(() => {
      this.loadMovies();
    });
  }

  // Delete movie
  deleteMovie(id: number): void {
    this.movieService.deleteMovie(id).subscribe(() => {
      this.loadMovies()
    });

  }

  // search movie by title (user)
  // searchMovieUser(){

  //   if (!this.searchTitleUser.trim()) return;
  //   this.movieService.searchMovieBytitle(this.searchTitle).subscribe((movies) => {
  //     if (movies) {
  //       this.movies;
  //     }
  //   });

  // }

  // add group of movies (admin)

  addMovies(movies: Movie[]): void {
    this.movieService.addMovies(movies).subscribe(() => {
      this.loadMovies();
    });
  }


  // delete group of movies
  deleteMovies(moviesId: number[]): void {
    this.movieService.deleteMovies(moviesId).subscribe(() => {
      this.loadMovies();
      this.selectedMovies =[]
    });

  }



  selectMovie(movie:Movie){
    movie.isSelected = !movie.isSelected;
    this.selectedMovies.push(movie.id);
  }

  selectAll(){
    this.selectedMovies = this.movies.map(movie=>{
      movie.isSelected = true;
      return movie.id
    })
    this.select_all = false;
    // console.log(this.selectedMovies);
  }
   unSelectAll(){
    this.selectedMovies = [];
    this.movies.map(movie=>{
      movie.isSelected = false;
    })
    this.select_all = true;
   }



   selectMovieFromSearch(movie:Movie){
    movie.isSelected = !movie.isSelected;
    this.selectedMoviesFromSearch.push(movie);
  }

  selectAllSearch(){
    this.selectedMoviesFromSearch = this.OMDSearchedMovies.map(movie=>{
      movie.isSelected = true;
      return movie
    })
    this.select_all_search = false;
    // console.log(this.selectedMovies);
  }
   unSelectAllSearch(){
    this.selectedMoviesFromSearch = [];
    this.OMDSearchedMovies.map(movie=>{
      movie.isSelected = false;
    })
    this.select_all_search = true;
   }
  // selectMovie

}
