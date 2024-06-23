import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Observable, forkJoin, from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) { }

  getAccounts(): Observable<any[]> {
    return this.firestore.collection('acc').valueChanges({ idField: 'id' });
  }
  getApplications(): Observable<any[]> {
    return this.firestore.collection('app').valueChanges({ idField: 'id' });
  }

  getApplicationsById(accountId: string): Observable<any[]> {
    return this.firestore.collection<any>('app', ref => ref.where('accId', 'array-contains', accountId))
      .valueChanges({ idField: 'id' });
  }

  addAccount(account: any) {
    return this.firestore.collection('acc').add(account);
  }

  updateAccount(accountId: string, account: any) {
    return this.firestore.collection('acc').doc(accountId).update(account);
  }

  deleteAccount(accountId: string) {
    return this.firestore.collection('acc').doc(accountId).delete();
  }

  addApplication(application: any) {
    return this.firestore.collection('app').add(application);
  }

  updateApplication(applicationId: string, application: any) {
    return this.firestore.collection('app').doc(applicationId).update(application);
  }

  deleteApplication(applicationId: string) {
    return this.firestore.collection('app').doc(applicationId).delete();
  }

  removeLinkApplicationFromAccount(accountId: string, applicationId: string): Promise<void> {
    const appRef = this.firestore.collection('app').doc(applicationId);

    return appRef.update({
        accId: firebase.firestore.FieldValue.arrayRemove(accountId)
    })
    .then(() => {
        console.log(`Removed accountId ${accountId} from application ${applicationId}`);
    })
    .catch(error => {
        console.error(`Error removing accountId ${accountId} from application ${applicationId}:`, error);
        throw error;
    });
}

linkAccIdToApplication(applicationId: string, accountId: string): Promise<void> {
  const appRef = this.firestore.collection('app').doc(applicationId);

  return appRef.update({
    accId: firebase.firestore.FieldValue.arrayUnion(accountId)
  }).then(() => {
      console.log('accId successfully linked to application');
  }).catch(error => {
      console.error('Error linking accId to application:', error);
      throw error;
  });
}

  
}
