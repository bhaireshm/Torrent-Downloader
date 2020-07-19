import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { YtsService } from 'src/app/services/yts.service';

@Component({
  selector: 'app-single-movie-details',
  templateUrl: './single-movie-details.component.html',
  styleUrls: ['./single-movie-details.component.scss'],
})
export class SingleMovieDetailsComponent implements OnInit {
  id: number;
  movie: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private yts: YtsService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.yts.fetchMovieById(this.id).subscribe((res) => {
      this.movie = res.data.movie;
      console.log(this.movie);
    });
  }
}
