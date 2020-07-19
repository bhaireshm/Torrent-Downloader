import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { YtsService } from '../../../services/yts.service';

declare var require: any;
const FileSaver = require('file-saver');

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  torrentRes: any;
  movies: [];
  pageLimit: number;
  movieCount: number;
  pageNumber: any = 1;
  pageSize: number = 12;
  searchStr: string;
  isFetching: boolean;

  constructor(private yts: YtsService, private http: HttpClient) {}

  ngOnInit() {
    // this.fetchMovies();
    this.pageLimit = this.yts.pageLimit;
  }

  fetchMovies() {
    this.isFetching = true;
    this.yts.fetchAllMovies().subscribe((res) => {
      console.log(res);
      this.isFetching = false;
      this.torrentRes = res.data;
      this.movieCount = this.torrentRes.movie_count;
      this.movies = res.data.movies;
    });
  }

  searchMovies(event: any) {
    if (event.key === 'Enter') {
      this.isFetching = true;
      // console.log(event);
      this.searchStr = event.target.value;
      console.log(event.target.value);
      this.yts.search(event.target.value).subscribe((res) => {
        console.log(res);
        this.isFetching = false;
        this.torrentRes = res.data;
        this.movieCount = this.torrentRes.movie_count;
        if (res.status == 'ok') {
          this.pageNumber = 1;
          this.movies = res.data.movies;
        }
      });
    }
  }

  gotoNextpage(n: any) {
    if (n) {
      let a = this.pageLimit / this.movieCount;
      console.log(a);
    } else {
      this.pageNumber++;
    }
    this.isFetching = true;
    this.yts.nextPage(this.searchStr, this.pageNumber).subscribe((res) => {
      console.log(res);
      this.isFetching = false;
      this.torrentRes = res.data;
      if (res.status == 'ok') {
        this.movies = res.data.movies;
      }
    });
  }

  downloadTorrent(torrent: any, movie: any) {
    let downloadUrl = torrent.url,
      fileName = `${movie.title_english} (${movie.language} ${movie.year} ${torrent.quality} ${torrent.size}).torrent`;
    fileName = fileName.split(' ').join('_');
    FileSaver.saveAs(downloadUrl, fileName);
  }
}
