import { Component } from '@angular/core';
import { Championship } from '../../models/championship';
import { ChampionshipService } from '../../services/championship.service';

@Component({
  selector: 'app-champ-form',
  templateUrl: './champ-form.component.html',
  styleUrls: ['./champ-form.component.scss'],
})
export class ChampFormComponent {
  public championshipList!: Championship[];
  public championship = {} as Championship;

  public yearI!: number;
  public yearF!: number;

  constructor(private service: ChampionshipService) {}

  ngOnInit(): void {
    this.service.selectEvent.subscribe({
      next: (data: Championship) => {
        this.championship = { ...data };
      },
    });
  }

  public insert() {
    if (this.championship.id) {
      this.service.update(this.championship).subscribe((data) => {
        this.championship = {} as Championship;
      });
    } else {
      this.service.insert(this.championship).subscribe((data) => {
        this.championship = {} as Championship;
      });
    }
  }

  public getChampionshipByY() {
    if (this.championship.year && (!this.yearI || !this.yearF)) {
      this.getChampionshipByYear();
    } else {
      this.getChampionshipByYearBetween();
    }
  }
  
  public getChampionshipByDescription() {
    this.service.getChampionshipByDescription(this.championship.description);
  }

  public getChampionshipByYear() {
    this.service.getChampionshipByYear(this.championship.year);
  }

  public getChampionshipByYearBetween() {
    this.service.getChampionshipByYearBetween(this.yearI, this.yearF);
  }
}
