import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../../models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };

  disableBalanceOnAdd: boolean;
  @ViewChild('clientForm') form: any;

  constructor(private flashMessage: FlashMessagesService,
              private clientService: ClientService,
              private router: Router,
              private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }

  onSubmit(clientForm): void {
    // console.log(clientForm.value);
    if (this.disableBalanceOnAdd) {
      clientForm.value.balance = 0;
    }

    if (!clientForm.value.firstName || !clientForm.value.lastName || !clientForm.value.email || !clientForm.value.phone) {
      // show error
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    }else{
      // add new client
      const newClient: Client = {
        id: uuidv4(),
        firstName: clientForm.value.firstName,
        lastName: clientForm.value.lastName,
        email: clientForm.value.email,
        phone: clientForm.value.phone,
        balance: clientForm.value.balance
      };
      this.clientService.newClient(newClient);
      // redirect
      this.router.navigate(['/']);
      // show message
      this.flashMessage.show('New client added', {
        cssClass: 'alert-success', timeout: 4000
      });
    }
  }

}
