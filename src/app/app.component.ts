import { Component } from '@angular/core';
import {TabMenuModule} from 'primeng/tabmenu';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'movies';
  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
        {label: 'Accueil', icon: 'pi pi-fw pi-home', routerLink:"/home"},
        {label: 'Liste de films', icon: 'pi pi-fw pi-file' , routerLink:"/movies"}
    ];
}

}
