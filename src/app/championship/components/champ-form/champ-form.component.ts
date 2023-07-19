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

  public getChampionshipByDescription() {
    this.service
      .getChampionshipByDescription(this.championship.description)
      .subscribe((data) => {
        this.championshipList = data;
      });
  }
}
