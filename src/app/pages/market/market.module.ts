import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketRoutingModule } from './market-routing.module';
import { FurySharedModule } from 'src/@fury/fury-shared.module';
import { MarketComponent } from './market.component';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../../@fury/shared/material-components.module';
import {ListModule} from '../../../@fury/shared/list/list.module';
import {BreadcrumbsModule} from '../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import {MarketItemModule} from './market-item/market-item.module';

@NgModule({
  declarations: [MarketComponent],
  imports: [
    CommonModule,
    MarketRoutingModule,
    FormsModule,
    MaterialModule,
    FurySharedModule,
    // Core
    ListModule,
    BreadcrumbsModule,
    MarketItemModule
  ]
})
export class MarketModule { }
