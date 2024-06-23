import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'mStartApp';
  items: MenuItem[] | undefined;
  constructor(){
    this.items = [
      { label: 'Master Detail', routerLink: '/master-detail' },
      { label: 'CRUD data', routerLink: '/crud-data' },
    ];
  }

  
}
