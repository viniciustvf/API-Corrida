import { Component } from '@angular/core';
import { Country } from '../../models/country';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-country-table',
  templateUrl: './country-table.component.html',
  styleUrls: ['./country-table.component.scss'],
})
export class CountryTableComponent {
  public countryList!: Country[];

  constructor(private service: CountryService) {}

  ngOnInit(): void {
    this.service.listAll().subscribe((countrys) => {
      this.countryList = countrys;
    });
  }

  public selectCountry(country: Country): void {
    this.service.countrySelected(country);
  }

  public delete(country: Country) {
    this.service.delete(country).subscribe(() => {
      this.service.listAll().subscribe((countrys) => {
        this.countryList = countrys;
      });
    });
  }
}
