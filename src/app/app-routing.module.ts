import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { RegisterGuard } from './guards/register.guard';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ClientsComponent } from './components/clients/clients.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DetailRestaurantsComponent } from './components/restaurants/components/detail-restaurants/detail-restaurants.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { AddRestaurantComponent } from './components/restaurants/components/add-restaurant/add-restaurant.component';
import { EditRestaurantComponent } from './components/restaurants/components/edit-restaurant/edit-restaurant.component';
const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent, canActivate: [RegisterGuard]},
  {path: 'clients', component: ClientsComponent, canActivate: [AuthGuard]},
  {path: 'client/add', component: AddClientComponent, canActivate: [AuthGuard]},
  {path: 'client/edit/:id', component: EditClientComponent, canActivate: [AuthGuard]},
  {path: 'client/:id', component: ClientDetailsComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  // restaurants
  {path: 'restaurant/add', component: AddRestaurantComponent, canActivate: [AuthGuard]},
  {path: 'restaurant/edit/:id', component: EditRestaurantComponent, canActivate: [AuthGuard]},
  {path: 'restaurants/:id', component: DetailRestaurantsComponent, canActivate: [AuthGuard]},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, RegisterGuard],
})
export class AppRoutingModule { }
