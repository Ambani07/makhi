import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { RestaurantsService } from '../../../../services/restaurants.service';
import { Restaurants } from '../../../../models/Rataurants';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.css']
})
export class EditRestaurantComponent implements OnInit {
  id: string;
  restaurant: Restaurants;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private flashMessage: FlashMessagesService,
              private restaurantService: RestaurantsService) { }

  ngOnInit(): void {
     // Get id from url
     this.id = this.route.snapshot.params[`id`];
     // Get client
     this.restaurantService.getRestaurant(this.id).subscribe(restaurant => this.restaurant = restaurant);
     if (this.restaurant){
       console.log(this.restaurant);
     }
  }

  onSubmit(restaurantForm: Restaurants): void {
    // console.log(this.restaurant, restaurant.value);
    this.restaurant.name = restaurantForm.value.name;
    this.restaurant.email = restaurantForm.value.email;
    this.restaurant.phone_number = restaurantForm.value.phone_number;

    if (this.validate(restaurantForm)) {
      this.flashMessage.show('Restaurant updated!', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.restaurantService.newRestaurant(this.restaurant);
      // // redirect
      this.router.navigate(['/']);
    }
  }

  validate(form): boolean {
    let message = '';
    if (!form.value.name) {
      message = 'Please provider your market name';
    }else if (!form.value.phone_number) {
      message = 'Please provider your contact number';
    }else if (!form.value.email) {
      message = 'Please provider your contact email address';
    }else {
      message = '';
    }
    if (message) {
      this.flashMessage.show(message, {
        cssClass: 'alert-danger', timeout: 4000
      });
      return false;
    }
    return true;
  }

}
