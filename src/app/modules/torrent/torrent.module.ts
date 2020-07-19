import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TorrentRoutingModule } from './torrent-routing.module';
import { SearchComponent } from './search/search.component';
import { SingleMovieDetailsComponent } from './single-movie-details/single-movie-details.component';

@NgModule({
  declarations: [SearchComponent, SingleMovieDetailsComponent],
  imports: [CommonModule, TorrentRoutingModule],
})
export class TorrentModule {}
