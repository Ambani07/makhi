import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from '../../services/restaurants.service';
import { Restaurants } from '../../models/Rataurants';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  rataurants: Restaurants;

  constructor(private restaurantsService: RestaurantsService) { }

  ngOnInit(): void {
    this.restaurantsService.getRestaurants().subscribe(restaurants => {
      this.rataurants = restaurants;
    });
    console.log(this.rataurants);
  }

}
