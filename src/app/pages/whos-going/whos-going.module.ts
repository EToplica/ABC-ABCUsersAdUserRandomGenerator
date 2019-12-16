import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { WhosGoingComponent } from './whos-going.component';
import {ListModule} from '../../../@fury/shared/list/list.module';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../../@fury/shared/material-components.module';
import {BreadcrumbsModule} from '../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import {RandomUserModule} from './random-user/random-user.module';
import { WhosGoingRoutingModule } from './whos-going-routing.module';


@NgModule({
  declarations: [WhosGoingComponent],
  imports: [
    CommonModule,
    WhosGoingRoutingModule,
    FormsModule,
    MaterialModule,
    FurySharedModule,

    ListModule,
    BreadcrumbsModule,
    RandomUserModule
  ]
})
export class WhosGoingModule { }
