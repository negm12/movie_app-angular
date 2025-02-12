import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import { NgIf ,NgFor} from '@angular/common';
import { RatingService } from '../../services/rating.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  imports:[NgIf,FormsModule,NgFor]
})
export class MovieDetailsComponent implements OnInit {

   rating_value:number=5;
   message:String ="";
  movie!: Movie;

  isAdmin:Boolean = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private ratingService:RatingService,
    private authService:AuthService
  ) {
    this.isAdmin = this.authService.isAdmin();
  }

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.movieService.getMovieDetails(movieId).subscribe((data) => {
        this.movie = data;
      });
    }
  }

  goBack() {
    window.history.back();
  }

  delete(id:number){
    this.movieService.deleteMovie(id)
  }


  rateMovie(movieId:number){

    const userId = Number(localStorage.getItem("userId"));
    // if(userId !=null){
      // console.log(movieId , userId , this.message , this.rating_value);

      this.ratingService.rateMovie(movieId,userId,this.rating_value,this.message).subscribe(() => {
        this.ngOnInit();
      });
    // }
  }


  // isAdmin:Boolean = this.authService.isAdmin()
  // isAdmin():Boolean{
  //   return this.authService.isAdmin()
  // }
}
