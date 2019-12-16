import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map, switchMap} from 'rxjs/operators';
import {uniq} from 'lodash-es';
import {combineLatest, of} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MarketService {
  private ref: any;

  constructor(
    private firestore: AngularFirestore
  ) { }
  getMarketItems() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // return this.firestore.collection('/items', ref => ref.where('date', '>=', today)).valueChanges();
    return this.firestore.collection<any>('items', ref => ref.where('date', '>=', today)).snapshotChanges()
      .pipe(
        map((marketItems) => {
          return marketItems.map(marketItem => {
            console.log(marketItem)
            const data = marketItem.payload.doc.data() as any;
            const id = marketItem.payload.doc.id;
            return {
              id,
              ...data
            };
          });
        })
      );
  }

  addMarketItem(marketItem: any) {
    console.log('MARKET ITEM TO ADD', marketItem);
    return this.firestore.collection('/items').add(marketItem);
  }
  updateMarketItem(id: string, marketItem: any) {
    console.log('MARKET ITEM TO UPDATE', marketItem);
    return this.firestore.doc(`/items/${id}`).update(marketItem);
  }
  deleteMarketItem(id: string) {
    return this.firestore.doc(`/items/${id}`).delete();
  }
}
