import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { environment } from '../environments/environment';

import { AngularFirestoreModule } from '@angular/fire/compat/firestore'; 
import { AngularFireModule } from '@angular/fire/compat'; 
import { MasterDetailComponent } from './master-detail/master-detail.component';
import { CrudDataComponent } from './crud-data/crud-data.component';




const routes: Routes = [
  { path: '', redirectTo: '/master-detail', pathMatch: 'full' },
  { path: 'master-detail', component: MasterDetailComponent },
  { path: 'crud-data', component: CrudDataComponent },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
