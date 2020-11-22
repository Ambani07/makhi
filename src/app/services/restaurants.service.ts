import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Restaurants } from '../models/Rataurants';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
    restaurantsCollection: AngularFirestoreCollection<Restaurants>;
    restaurantDoc: AngularFirestoreDocument<Restaurants>;
    restaurants: Observable<Restaurants[]>;
    restaurant: Observable<Restaurants>;

    constructor(private afs: AngularFirestore) {
        this.restaurantsCollection = this.afs.collection('retaurants', ref => ref.orderBy('name', 'asc'));
    }

    getRestaurants(): Observable<Restaurants[]> {
        this.restaurants = this.restaurantsCollection.snapshotChanges().pipe(
        map(changes => {
        return changes.map(action => {
                const data = action.payload.doc.data() as Restaurants;
                data.id = action.payload.doc.id;
                console.log(data);
                return data;
            });
        }));

        return this.restaurants;
    }

    getRestaurant(id: string): Observable<Restaurants> {
        this.restaurantDoc = this.afs.doc<Restaurants>(`retaurants/${id}`);
        this.restaurant = this.restaurantDoc.snapshotChanges().pipe(map(action => {
          if (action.payload.exists === false) {
            return null;
          } else {
            const data = action.payload.data() as Restaurants;
            data.id = action.payload.id;
            return data;
          }
        }));
        return this.restaurant;
      }

      newRestaurant(restaurant: Restaurants): void {
        this.restaurantsCollection.add(restaurant);
      }

      updateRestaurant(restaurants: Restaurants): void {
        this.restaurantDoc = this.afs.doc(`restaurants/${restaurants.id}`);
        this.restaurantDoc.update(restaurants);
      }
}
