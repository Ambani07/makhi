/**
 * SETTINGS
 */
import { environment } from '../environments/environment';

/**
 * MODULES
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';

/**
 * SERVICES
 */
import { ClientService } from './services/client.service';
import { AuthService } from './services/auth.service';
import { SettingsService } from './services/settings.service';
import { RestaurantsService } from './services/restaurants.service';

/**
 * COMPONENTS
 */
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';

// Clients
import { ClientsComponent } from './components/clients/clients.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';

// Restaurants
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { AddRestaurantComponent } from './components/restaurants/components/add-restaurant/add-restaurant.component';
import { EditRestaurantComponent } from './components/restaurants/components/edit-restaurant/edit-restaurant.component';
import { DetailRestaurantsComponent } from './components/restaurants/components/detail-restaurants/detail-restaurants.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MenuRestaurantsComponent } from './components/restaurants/components/menu-restaurants/menu-restaurants.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    ClientsComponent,
    SidebarComponent,
    AddClientComponent,
    EditClientComponent,
    ClientDetailsComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    NotFoundComponent,
    RestaurantsComponent,
    AddRestaurantComponent,
    EditRestaurantComponent,
    DetailRestaurantsComponent,
    MenuRestaurantsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'clientpanel'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
  ],
  providers: [ClientService,
              AuthService,
              SettingsService,
              RestaurantsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
