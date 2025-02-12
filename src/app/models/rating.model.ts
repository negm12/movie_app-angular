import { User } from "./user.model";
import { Movie } from "./movie.model";

export interface Rating {
  id?: number;
  user?: User;
  movie?: Movie;
  movieId?: number;
  userId?: number;
  rating: number;
  message: string;
}
