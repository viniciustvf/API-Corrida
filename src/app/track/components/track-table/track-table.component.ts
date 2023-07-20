import { Component } from '@angular/core';
import { Track } from '../../models/track';
import { TrackService } from '../../services/track.service';
import { CountryService } from '../../../country/services/country.service';
import { AuthService } from '../../../login/services/auth.service';

@Component({
  selector: 'app-track-table',
  templateUrl: './track-table.component.html',
  styleUrls: ['./track-table.component.scss'],
})
export class TrackTableComponent {
  public trackList!: Track[];

  constructor(private service: TrackService) {}

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
