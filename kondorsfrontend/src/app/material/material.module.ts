import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card'
import {MatGridListModule} from '@angular/material/grid-list'
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatSelectModule} from '@angular/material/select';
@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule
  ], 
  exports:[
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule
  ]
})
export class MaterialModule { }
