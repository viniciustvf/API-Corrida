import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackComponent } from './components/track/track.component';
import { FormsModule } from '@angular/forms';
import { TrackFormComponent } from './components/track-form/track-form.component';
import { TrackTableComponent } from './components/track-table/track-table.component';
import { TrackSizeBetweenComponent } from './components/track-size-between/track-size-between.component';
import { TrackFindByCountryComponent } from './components/track-find-by-country/track-find-by-country.component';

@NgModule({
  declarations: [TrackComponent, TrackFormComponent, TrackTableComponent, TrackSizeBetweenComponent, TrackFindByCountryComponent],
  imports: [CommonModule, FormsModule],
  exports: [TrackComponent],
})
export class TrackModule {}
