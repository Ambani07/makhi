import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from '../../models/Client';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  // properties
  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };
  disableBalanceOnEdit: boolean;

  constructor(private clientService: ClientService,
              private router: Router,
              private route: ActivatedRoute,
              private flashMessage: FlashMessagesService,
              private settingsService: SettingsService) { }

  ngOnInit(): void {
    // Get id from url
    this.id = this.route.snapshot.params[`id`];
    // Get client
    this.clientService.getClient(this.id).subscribe(client => this.client = client);

    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
  }

  onSubmit(clientForm: Client): void {
    if (!clientForm.value.firstName || !clientForm.value.lastName || !clientForm.value.email || !clientForm.value.phone) {
      // show error
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    }else{
      // update new client
      const newClient: Client = {
        id: this.id,
        firstName: clientForm.value.firstName,
        lastName: clientForm.value.lastName,
        email: clientForm.value.email,
        phone: clientForm.value.phone,
        balance: clientForm.value.balance
      };
      this.clientService.updateClient(newClient);
      // redirect
      this.router.navigate(['/']);
      // show message
      this.flashMessage.show('Client updated', {
        cssClass: 'alert-success', timeout: 4000
      });
    }
  }

}
