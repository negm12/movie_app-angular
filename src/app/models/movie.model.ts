import { Rating } from "./rating.model";

export interface Movie {
  id: number;
  imdbID: string;
  title: string;
  year: string;
  rating_value: number;
  runtime: string;
  genre: string;
  director: string;
  writer: string;
  actors: string;
  plot: string;
  language: string;
  poster: string;
  ratings?: Rating[];
  isSelected?:boolean;
}
