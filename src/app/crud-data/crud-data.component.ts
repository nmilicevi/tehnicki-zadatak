import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Account } from '../models/account';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Application } from '../models/application';

@Component({
  selector: 'app-crud-data',
  templateUrl: './crud-data.component.html',
  styleUrl: './crud-data.component.css',
  providers: [MessageService, ConfirmationService]
})
export class CrudDataComponent {

  accounts!: Account[];
  applications!: Application[];
  allApplications!: Application[];
  status: any[] | undefined;
  clonedProducts: { [s: string]: Account } = {};
  clonedApplications: { [s: string]: Application } = {};
  newAcount!: FormGroup;
  newApp: FormGroup;
  deleteButtonDisabled!: boolean;
  rangeDates: Date[] = [];
  isDateFilterted: any;
  fromDate: any;
  toDate: any;
  filteredAccounts!: Account[];
  filterbyDateBoolean: boolean = false;
  loadAccounts: boolean = true;
  visible: boolean = false;
  visible1: boolean = false;

  constructor(
    private firebaseService: FirebaseService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
  ) {
    this.status = [
      { label: 'true', value: 'true' },
      { label: 'false', value: 'false' },
    ];

    this.newAcount = this.fb.group({
      email: ['', Validators.required, Validators.email],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      active: ['', Validators.required]
    });
    this.newApp = this.fb.group({
      name: ['', Validators.required],
      version: ['', Validators.required],
      url: ['', Validators.required],
      accId:['']
    });

  }

  ngOnInit() : void {
    this.getAccounts();
    this.getApplications();
  }

  getAccounts() {
    this.firebaseService.getAccounts().subscribe((data => {
      this.accounts = data;
      this.loadAccounts=false;
    }))
  }

  getApplications() {
    this.firebaseService.getApplications().subscribe((data => {
      this.allApplications = data;

    }))
  }

  onRowEditInit(account: Account) {

    this.clonedProducts[account.id as string] = { ...account };
  }

  onRowEditSave(account: Account) {
    this.firebaseService.updateAccount(account.id, account).then(() => {
      console.log('Account updated successfully');
    })
      .catch(error => {
        console.error('Error updating account: ', error);

      });
    delete this.clonedProducts[account.id as string];
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });

  }

  onRowEditCancel(product: Account, index: number) {
    this.accounts[index] = this.clonedProducts[product.id as string];
    delete this.clonedProducts[product.id as string];
  }


  deleteSelectedAccount(account: Account) {
    console.log('Attempting to delete account:', account);
    this.deleteButtonDisabled = true;
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the ' + account.first_name + ' ' + account.last_name + ' account ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log('Deleting account:', account);
        this.firebaseService.deleteAccount(account.id)
          .then(() => {
            console.log('Account deleted successfully');
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Account Deleted', life: 3000 });
          })
          .catch(error => {
            console.error('Error deleting account: ', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting account', life: 3000 });
          })
          .finally(() => {
            this.deleteButtonDisabled = false;
          });

      },
      reject: () => {
        console.log('Deletion canceled');
        this.deleteButtonDisabled = false;
      }
    });
  }




  showDialogAddAccount() {
    this.visible = true;
  }
  showDialogAddApplication() {
    this.visible1 = true;
  }



  addNewAccount() {
    if (this.newAcount.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields' });
      return;
    }

    const formData = this.newAcount.value;

    this.firebaseService.addAccount(formData)
      .then(() => {
        console.log('Account created successfully');
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Account created' });
        this.newAcount.reset();
        this.visible1 = false;

      })
      .catch(error => {
        console.error('Error creating account: ', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error creating account' });
      });

  }



  onRowEditCancelApplication(product: Application, index: number) {
    this.accounts[index] = this.clonedProducts[product.id as string];
    delete this.clonedProducts[product.id as string];
  }
  onRowEditSaveApplication(product: Application) {
    this.firebaseService.updateAccount(product.id, product).then(() => {
      console.log('Account updated successfully');
    })
      .catch(error => {
        console.error('Error updating account: ', error);

      });
    delete this.clonedProducts[product.id as string];
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });

  }
  onRowEditInitApplication(application: Application) {
    this.clonedApplications[application.id] = { ...application };
  }

  deleteApplication(application: Application) {
    console.log('Attempting to delete application:', application);
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the ' + application.name + ' application ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log('Deleting account:', application);
        this.firebaseService.deleteApplication(application.id)
          .then(() => {
            console.log('Account deleted successfully');
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Account Deleted', life: 3000 });
          })
          .catch(error => {
            console.error('Error deleting account: ', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting account', life: 3000 });
          });
      },
      reject: () => {
        console.log('Deletion canceled');
      }
    });
  }

  addNewApplication() {
    if (this.newApp.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields' });
      return;
    }

    const formData = this.newApp.value;

    this.firebaseService.addApplication(formData)
      .then(() => {
        console.log('Account created successfully');
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Account created' });
        this.newApp.reset();
        this.visible1 = false;

      })
      .catch(error => {
        console.error('Error creating account: ', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error creating account' });
      });

  }

  filterByDate() {
    this.filterbyDateBoolean = true;
    console.log('Selected range:', this.rangeDates);
    if (this.rangeDates && this.rangeDates.length === 2) {
      const [start, end] = this.rangeDates;
      this.filteredAccounts = this.accounts.filter(account => {
        const dob = new Date(account.date_of_birth);
        return dob >= start && dob <= end;
      });
      console.log('Filtered Accounts:', this.filteredAccounts);
    } else {
      this.filteredAccounts = this.accounts;
      this.filterbyDateBoolean = false;
    }
  }
  
  onCloseCalendar() {
    if (this.rangeDates[0] != null && this.rangeDates[1] != null && this.rangeDates.length == 2) {
      this.filterByDate();
    }
  }

  filterWithoutRange(){
    this.filterbyDateBoolean = false;
    this.rangeDates = []; 
    
  }



}