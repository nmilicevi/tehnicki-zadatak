import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Account } from '../models/account';

@Component({
  selector: 'app-acc-select-dialog',
  templateUrl: './acc-select-dialog.component.html',
  styleUrl: './acc-select-dialog.component.css'
})
export class AccSelectDialogComponent {
  accounts!: Account[];
  pickedApplication: any;

  constructor(
    public dynamicDialogConfig: DynamicDialogConfig,
    public dynamicDialogRef: DynamicDialogRef,
  ){
    }

    ngOnInit(){
      this.accounts = this.dynamicDialogConfig.data.accounts;
      this.pickedApplication = this.dynamicDialogConfig.data.pickedApplication
    }

    selectAccount(account: Account) {
      this.dynamicDialogRef.close(account);
    }


  }
