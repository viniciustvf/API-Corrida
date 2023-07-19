import { Component } from '@angular/core';
import { Track } from '../../models/track';
import { TrackService } from '../../services/track.service';
import { CountryService } from '../../../country/services/country.service';

@Component({
  selector: 'app-track-table',
  templateUrl: './track-table.component.html',
  styleUrls: ['./track-table.component.scss'],
})
export class TrackTableComponent {
  public trackList!: Track[];

  constructor(
    private service: TrackService,
    private countryService: CountryService
  ) {}

  ngOnInit(): void {
    this.service.listAll().subscribe((data) => {
      this.trackList = data;
    });
  }

  public selectTrack(user: Track): void {
    this.service.userSelected(user);
  }

  public delete(user: Track) {
    this.service.delete(user).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.trackList = data;
      });
    });
  }
}
