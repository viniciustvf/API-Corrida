import { Component } from '@angular/core';
import { Track } from '../../models/track';
import { TrackService } from '../../services/track.service';

@Component({
  selector: 'app-pista-table',
  templateUrl: './pista-table.component.html',
  styleUrls: ['./pista-table.component.scss'],
})
export class PistaTableComponent {
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
