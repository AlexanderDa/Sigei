import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Provider {
  name: string;
  telephone: string;
  address: string;
  contactLastName: string;
  contactFirstName: string;
  contactEmail: string;
  contactTelephone: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProviderService {


  private collection: AngularFirestoreCollection<Provider>;
  private list: Observable<Provider[]>;


  constructor(db: AngularFirestore) {
    this.collection = db.collection<Provider>('provider');
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

  public get(): Observable<Provider[]> {
    return this.list;
  }

  public getById(id: string): Observable<Provider> {
    return this.collection.doc<Provider>(id).valueChanges();
  }

  public post(provider: Provider): any {
    return this.collection.add(provider);
  }

  public put(provider: Provider, id: string): any {
    return this.collection.doc(id).update(provider);
  }
  public delete(id: string): any {
    return this.collection.doc(id).delete();
  }
}
