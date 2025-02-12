import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rating } from '../models/rating.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

   constructor(private http:HttpClient) {}

  rateMovie (movie_id:number,user_id:Number,rating:number,message:String):Observable<Rating>{
    const ratingobj ={movie_id,user_id,rating,message}
    // console.log(ratingobj);

     return this.http.post<Rating>('http://localhost:8080/rating',ratingobj)
  }
}
