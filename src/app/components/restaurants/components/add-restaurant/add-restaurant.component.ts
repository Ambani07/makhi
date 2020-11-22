import { Component, OnInit, ViewChild } from '@angular/core';
import { Restaurants } from '../../../../models/Rataurants';
import { Address } from '../../../../models/Address';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { RestaurantsService } from '../../../../services/restaurants.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit {
  restaurant: Restaurants = {
    id: uuidv4(),
    name: '',
    phone_number: '',
    email: '',
    delivery: false,
    logo: 'https://via.placeholder.com/60/60/fff.png',
    image_cover: 'https://via.placeholder.com/1200/1200/fff.png',
    created_at: new Date().toDateString(),
    updated_at: new Date().toDateString(),
    address: {
      street: '',
      city: '',
      province: '',
      postal_code: ''
    },
    menu: [],
    user: '',
  };
  currentTime = new Date().toDateString();

  @ViewChild('restaurantForm') form: any;

  constructor(private flashMessage: FlashMessagesService,
              private authService: AuthService,
              private restaurantService: RestaurantsService,
              private router: Router) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth => {
      this.restaurant.user = auth.uid;
    });
    console.log(this.restaurant);
  }

  onSubmit(restaurantForm): void {
    if (this.validate(restaurantForm)) {
      this.flashMessage.show('Let\'s get started!', {
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

  onChange(event): void {
    console.log(event);
    // if (this.restaurant.devlivery === event) { return; }
    // this.restaurant.devlivery = event;
    // console.log(this.restaurant.devlivery);
  }

}
