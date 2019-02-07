import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './product.service';
import { Category } from './category.service';
export interface Product {
  name: string;
  category: Category;
  stock: number;
  purchasePrice: number;
  salePrice: number;
}
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private collection: AngularFirestoreCollection<Product>;
  private list: Observable<Product[]>;


  constructor(db: AngularFirestore) {
    this.collection = db.collection<Product>('product');
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

  public get(): Observable<Product[]> {
    return this.list;
  }

  public getById(id: string): Observable<Product> {
    return this.collection.doc<Product>(id).valueChanges();
  }

  public post(product: Product): any {
    return this.collection.add(product);
  }

  public put(product: Product, id: string): any {
    return this.collection.doc(id).update(product);
  }
  public delete(id: string): any {
    return this.collection.doc(id).delete();
  }
}
