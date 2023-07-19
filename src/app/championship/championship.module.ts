import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChampionshipComponent } from './components/championship/championship.component';
import { ChampFormComponent } from './components/champ-form/champ-form.component';
import { ChampTableComponent } from './components/champ-table/champ-table.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ChampionshipComponent,
    ChampFormComponent,
    ChampTableComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [ChampionshipComponent],
})
export class ChampionshipModule {}
