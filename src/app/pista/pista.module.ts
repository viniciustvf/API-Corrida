import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PistaComponent } from './components/pista/pista.component';
import { PistaFormComponent } from './components/pista-form/pista-form.component';
import { PistaTableComponent } from './components/pista-table/pista-table.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PistaComponent, PistaFormComponent, PistaTableComponent],
  imports: [CommonModule, FormsModule],
  exports: [PistaComponent],
})
export class PistaModule {}
