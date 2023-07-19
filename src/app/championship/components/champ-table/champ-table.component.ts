import { Component } from '@angular/core';
import { ChampionshipService } from '../../services/championship.service';
import { Championship } from '../../models/championship';

@Component({
  selector: 'app-champ-table',
  templateUrl: './champ-table.component.html',
  styleUrls: ['./champ-table.component.scss'],
})
export class ChampTableComponent {
  public championshipList!: Championship[];

  constructor(private service: ChampionshipService) {}

  ngOnInit(): void {
    this.service.listAll().subscribe((championships) => {
      this.championshipList = championships;
    });
  }

  public selectChampionship(championship: Championship): void {
    this.service.championshipSelected(championship);
  }

  public delete(championship: Championship) {
    this.service.delete(championship).subscribe(() => {
      this.service.listAll().subscribe((championships) => {
        this.championshipList = championships;
      });
    });
  }
}
