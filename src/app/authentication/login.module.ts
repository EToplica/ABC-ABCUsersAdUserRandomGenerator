import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {MaterialModule} from '../../@fury/shared/material-components.module';
import {MatProgressButtonsModule} from 'mat-progress-buttons';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatProgressButtonsModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule {
}
