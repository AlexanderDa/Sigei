import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Provider } from './provider.service';
import { Product } from './product.service';


export interface Order {
  provider: Provider;
  product: Product;
  quantity: number;
  unitPrice: number;
  orderNumber: string;
  delivered: boolean;
  deliveryDate: string;
}


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private collection: AngularFirestoreCollection<Order>;
  private list: Observable<Order[]>;


  constructor(db: AngularFirestore) {
    this.collection = db.collection<Order>('order');
    this.list = this.collection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  public get(): Observable<Order[]> {
    return this.list;
  }

  public getById(id: string): Observable<Order> {
    return this.collection.doc<Order>(id).valueChanges();
  }

  public post(order: Order): any {
    return this.collection.add(order);
  }

  public put(order: Order, id: string): any {
    return this.collection.doc(id).update(order);
  }
  public delete(id: string): any {
    return this.collection.doc(id).delete();
  }
}
