import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { RestaurantsService } from '../../../../services/restaurants.service';
import { Restaurants } from '../../../../models/Rataurants';

@Component({
  selector: 'app-detail-restaurants',
  templateUrl: './detail-restaurants.component.html',
  styleUrls: ['./detail-restaurants.component.css']
})
export class DetailRestaurantsComponent implements OnInit {
  id: string;
  restaurant: Restaurants;
  menu = [];
  constructor(private restaurantsService: RestaurantsService,
              private router: Router,
              private route: ActivatedRoute,
              private flashMessages: FlashMessagesService) { }

  ngOnInit(): void {
    // Get id from url
    this.id = this.route.snapshot.params[`id`];
    // Get restaurant
    this.restaurantsService.getRestaurant(this.id).subscribe(restaurant => {
      this.restaurant = restaurant;
      this.menu = this.restaurant.menu;
    });
  }

  onDeleteClick(): void {
    // console.log('Delete', this.id);
    if (confirm('Are you sure?')) {
      this.restaurantsService.deleteRestaurant(this.restaurant);
      this.flashMessages.show('Restaurant Deleted', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/']);
      console.log(this.id);
    }
  }

  orderNowClick(): void {
    console.log('order now!...');
  }

}
