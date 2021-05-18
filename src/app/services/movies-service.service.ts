import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Movies } from "../models/movies";
import { pageMovies } from "../models/pagemovies";



@Injectable({
  providedIn: 'root'
})
export class MoviesService {

    private baseUrlMovies =  environment.apiUrl + 'movies';

    constructor(private http: HttpClient) { }

    deleteMovies(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrlMovies}/${id}`, {responseType: 'text' });
    }

    getMoviesList(filtre : string, page : any , size: any): Observable<pageMovies> {
        return this.http.get<pageMovies>(`${this.baseUrlMovies}?globalFilter=${filtre}&page=${page}&size=${size}`);
    }

    getMovie(id: number): Observable<Movies> {
      return this.http.get<Movies>(`${this.baseUrlMovies}/${id}`);
  }
    
    postMovies(movie: Movies): Observable<Movies> {
      return this.http.post<Movies>(`${this.baseUrlMovies}` + `/create`, movie);
    }
  
    updateMovies(id: number, value: Movies): Observable<Movies> {
      return this.http.put<Movies>(`${this.baseUrlMovies}/${id}`, value);
    }

}