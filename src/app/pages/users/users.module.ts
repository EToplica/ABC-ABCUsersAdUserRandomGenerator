import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { UsersComponent } from './users.component';
import {ListModule} from '../../../@fury/shared/list/list.module';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../../@fury/shared/material-components.module';
import {BreadcrumbsModule} from '../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import {UserModule} from './user/user.module';
import {UsersRoutingModule} from './users-routing.module';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    MaterialModule,
    FurySharedModule,
    // Core
    ListModule,
    BreadcrumbsModule,
    UserModule
  ]
})
export class UsersModule { }
