import { Component } from '@angular/core';
import { Track } from '../../models/track';
import { TrackService } from '../../services/track.service';

@Component({
  selector: 'app-track-form',
  templateUrl: './pista-form.component.html',
  styleUrls: ['./pista-form.component.scss'],
})
export class PistaFormComponent {
  public trackList!: Track[];
  public track = {} as Track;

  constructor(private service: TrackService) {}

  ngOnInit(): void {
    this.service.selectEvent.subscribe({
      next: (data: Track) => {
        this.track = { ...data };
      },
    });
  }

  public insert() {
    if (this.track.id) {
      this.service.update(this.track).subscribe((data) => {
        this.track = {} as Track;
      });
    } else {
      this.service.insert(this.track).subscribe((data) => {
        this.track = {} as Track;
      });
    }
  }

  public getTracksByName() {
    this.service.getUsersByName(this.track.name).subscribe((data) => {
      this.trackList = data;
    });
  }
}
