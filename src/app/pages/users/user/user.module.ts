import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule, MatDialogModule, MatGridListModule, MatIconModule, MatInputModule} from '@angular/material';
import {MatProgressButtonsModule} from 'mat-progress-buttons';
import {UserComponent} from './user.component';

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
  declarations: [UserComponent],
  entryComponents: [UserComponent],
  exports: [UserComponent],
})
export class UserModule { }
