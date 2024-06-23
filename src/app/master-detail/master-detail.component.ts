import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import { Account } from '../models/account';
import { Application } from '../models/application';
import { DialogService } from 'primeng/dynamicdialog';
import { AccSelectDialogComponent } from '../acc-select-dialog/acc-select-dialog.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-master-detail',
  templateUrl: './master-detail.component.html',
  styleUrl: './master-detail.component.css',
  providers:[DialogService,MessageService]
})
export class MasterDetailComponent {
  loadAccounts: boolean = true;



  accounts!: Account[];
  applications!: Application[];
  selectedAccountId: Account| null = null;
  selectedAccount: Account | null=null;
  selectedApplication: Application | null = null;
  allApplications!:  Application[];
  visible: boolean = false;

  constructor(
    private firebaseService: FirebaseService,
    private dialogService: DialogService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.getAccounts();
    this.getApplications();
  }

  getAccounts(){
    this.firebaseService.getAccounts().subscribe((data=>{
      this.accounts=data;
      this.loadAccounts=false;
    }))
  }

  getApplications(){    
    this.firebaseService.getApplications().subscribe((data=>{
    this.allApplications=data;
    
  }))}

  onSelectAccount(account: Account) {
    this.selectedAccountId = account;
    this.firebaseService.getApplicationsById(account.id).subscribe((data)=>{
      this.applications =data;
    })
    
  }

  removeLinkApplication(selectedAccountId: Account,applications: any) {
    this.firebaseService.removeLinkApplicationFromAccount(selectedAccountId.id, applications)
    .then(() => {
      console.log('Application deleted from account successfully');
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Application deleted from account successfully' });
    })
    .catch(error => {
      console.error('Error deleting application from account:', error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting application from account' });
    });
}

linkApplication(accountId: string, pickedApplication: Application) {
  console.log("selectedAccount" + this.selectedAccount);
  this.firebaseService.linkAccIdToApplication(pickedApplication.id, accountId)
    .then(() => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Application is linked to Account' });
    })
    .catch(error => {
      console.error('Error linking Application to Account:', error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error linking Application to Account' });
    });
}
 

  showDialogAddAccount(pickedApplication:Application){
    const ref = this.dialogService.open(AccSelectDialogComponent, {
      header: 'Select Account',
      width: '70%',
      data: {
        accounts: this.accounts,
        pickedApplication: pickedApplication.id
      }
    });

    const onCloseSubscription = ref.onClose.subscribe((selectedAccount: Account) => {
      if (selectedAccount) {
        console.log('Selected account:', selectedAccount);
        this.linkApplication(selectedAccount.id, pickedApplication);
      }
      onCloseSubscription.unsubscribe(); 
    });
  }
    
reaload(){
  this.selectedAccountId=null;
}

}
