import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule, MatDialogModule, MatGridListModule, MatIconModule, MatInputModule} from '@angular/material';
import {MatProgressButtonsModule} from 'mat-progress-buttons';
import {RandomUserComponent} from './random-user.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressButtonsModule,
    MatGridListModule
  ],
  declarations: [RandomUserComponent],
  entryComponents: [RandomUserComponent],
  exports: [RandomUserComponent],
})
export class RandomUserModule { }
