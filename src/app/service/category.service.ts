import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Category {
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private collection: AngularFirestoreCollection<Category>;
  private list: Observable<Category[]>;


  constructor(db: AngularFirestore) {
    this.collection = db.collection<Category>('category');
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

  public get(): Observable<Category[]> {
    return this.list;
  }

  public getById(id: string): Observable<Category> {
    return this.collection.doc<Category>(id).valueChanges();
  }

  public post(category: Category): any {
    return this.collection.add(category);
  }

  public put(category: Category, id: string): any {
    return this.collection.doc(id).update(category);
  }
  public delete(id: string): any {
    return this.collection.doc(id).delete();
  }
}
