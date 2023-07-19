import { Component } from '@angular/core';
import { Track } from '../../models/track';
import { TrackService } from '../../services/track.service';
import { CountryService } from '../../../country/services/country.service';
import { Country } from '../../../country/models/country';

@Component({
  selector: 'app-track-form',
  templateUrl: './track-form.component.html',
  styleUrls: ['./track-form.component.scss'],
})
export class TrackFormComponent {
  public countryList!: Country[];
  public trackList!: Track[];

  public track = {} as Track;
  public showTrackSizeBetween: boolean = false;
  public showFindByCountry: boolean = false;

  constructor(
    private service: TrackService,
    private countryService: CountryService
  ) {}

  ngOnInit(): void {
    this.service.selectEvent.subscribe({
      next: (data: Track) => {
        this.track = { ...data };
      },
    });

    this.countryService.listAll().subscribe((data) => {
      this.countryList = data;
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
    this.service.getTracksByName(this.track.name).subscribe((data) => {
      this.trackList = data;
    });
  }

  public onFindClickSize() {
    this.showTrackSizeBetween = !this.showTrackSizeBetween;
  }

  public onFindClickCountry() {
    this.showFindByCountry = !this.showFindByCountry;
  }
}
