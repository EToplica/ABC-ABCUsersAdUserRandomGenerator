import { Component, OnInit } from '@angular/core';
import {MarketService} from '../../services/market.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {ListColumn} from '../../../@fury/shared/list/list-column.model';
import {fadeInRightAnimation} from '../../../@fury/animations/fade-in-right.animation';
import {fadeInUpAnimation} from '../../../@fury/animations/fade-in-up.animation';
import {MarketItemComponent} from './market-item/market-item.component';
import {MarketItem} from '../../models/marketItem/MarketItem';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'fury-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class MarketComponent implements OnInit {
  marketItems: any[] = [];
  columns: ListColumn[] = [
    { name: 'NAME', property: 'userName', visible: true, isModelProperty: true },
    { name: 'WANTS', property: 'name', visible: true, isModelProperty: true },
    { name: 'MONEY', property: 'money', visible: true, isModelProperty: false },
    { name: 'ACTIONS', property: 'actions', visible: true },
  ] as ListColumn[];
  today: Date = new Date();
  userId: string;
  constructor(
    private marketService: MarketService,
    private dialog: MatDialog,
    private router: Router,
    private snackbar: MatSnackBar,
    private angularAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.userId = this.angularAuth.auth.currentUser.uid;
    this.getMarketItems();
  }
  getMarketItems() {
    this.marketService.getMarketItems().subscribe(response => {
      this.marketItems = response;
      console.log('Response: ', this.marketItems);
    });
  }
  createMarketItem() {
    this.dialog.open(MarketItemComponent).afterClosed().subscribe((accepted: boolean) => {
    });
  }
  updateMarketItem(marketItem: any) {
    this.dialog.open(MarketItemComponent, {data: marketItem}).afterClosed().subscribe((accepted: boolean) => {
    });
  }
  deleteMarketItem(id: string) {
    this.marketService.deleteMarketItem(id).then(response => {
      this.snackbar.open(`Market item successfully deleted!`, '', {panelClass: 'success-toast'});
    });
  }
  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }
  getToday(): number {
    return Date.now();
  }
}
