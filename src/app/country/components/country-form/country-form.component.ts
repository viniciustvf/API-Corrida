import { Component } from '@angular/core';
import { Country } from '../../models/country';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.scss'],
})
export class CountryFormComponent {
  public countryList!: Country[];
  public country = {} as Country;

  constructor(private service: CountryService) {}

  ngOnInit(): void {
    this.service.selectEvent.subscribe({
      next: (data: Country) => {
        this.country = { ...data };
      },
    });
  }

  public insert() {
    if (this.country.id) {
      this.service.update(this.country).subscribe((data) => {
        this.country = {} as Country;
      });
    } else {
      this.service.insert(this.country).subscribe((data) => {
        this.country = {} as Country;
      });
    }
  }

  public getCountryByName() {
    this.service.getCountryByName(this.country.name);
  }
}
