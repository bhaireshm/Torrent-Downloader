import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class YtsService {
  pageLimit: any = null;
  constructor(private http: HttpClient) {}

  fetchAllMovies() {
    return this.http.post<any>(`${environment.baseUrl}/list_movies.json`, '', {
      params: { limit: this.pageLimit },
    });
  }

  search(str: string) {
    return this.http.post<any>(`${environment.baseUrl}/list_movies.json`, '', {
      params: { query_term: str, limit: this.pageLimit },
    });
  }

  nextPage(searchStr: string, pageNumber: any) {
    return this.http.post<any>(`${environment.baseUrl}/list_movies.json`, '', {
      params: {
        query_term: searchStr,
        limit: this.pageLimit,
        page: pageNumber,
      },
    });
  }

  fetchMovieById(id: any) {
    return this.http.post<any>(
      `${environment.baseUrl}/movie_details.json`,
      '',
      {
        params: {
          movie_id: id,
          with_images: 'true',
          with_cast: 'true',
        },
      }
    );
  }
}
