import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MasterDetailComponent } from './master-detail/master-detail.component';
import { environment } from '../environments/environment';
import { CrudDataComponent } from './crud-data/crud-data.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { MessagesModule } from 'primeng/messages';
import { InputTextModule } from 'primeng/inputtext';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabMenuModule } from 'primeng/tabmenu';
import { AccSelectDialogComponent } from './acc-select-dialog/acc-select-dialog.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';



@NgModule({
  declarations: [
    AppComponent,
    MasterDetailComponent,
    CrudDataComponent,
    AccSelectDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    TableModule,
    ToastModule,
    FormsModule,
    DropdownModule,
    TagModule,
    MessagesModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    BrowserAnimationsModule,
    ConfirmDialogModule ,
    DialogModule ,
    CardModule,
    CalendarModule ,
    ProgressSpinnerModule ,
    TabMenuModule,
    DynamicDialogModule,
  ],
  providers: [
    ConfirmationService,
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
