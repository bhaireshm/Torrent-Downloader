import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { SingleMovieDetailsComponent } from './single-movie-details/single-movie-details.component';

const routes: Routes = [
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'search/:id',
    component: SingleMovieDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TorrentRoutingModule {}
