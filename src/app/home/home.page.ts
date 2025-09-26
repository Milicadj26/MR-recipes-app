import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import{FormsModule} from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons,
  IonContent, IonIcon, IonSearchbar, IonButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';

import { homeOutline, searchOutline, optionsOutline, listOutline, pizzaOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    // ionic components used in the template:
    IonHeader, IonToolbar, IonTitle, IonButtons,
    IonContent, IonSearchbar, IonButton, IonIcon,
    // for [(ngModel)] on the searchbar:
    FormsModule,
  ],
})
export class HomePage {
  constructor() {
      addIcons({
        'home-outline': homeOutline,
        'search-outline': searchOutline,
        'list-outline': listOutline,
        'options-outline': optionsOutline,
      });
 }
 query = '';

 filterOn = false;
 toggleFilter(){
  this.filterOn = !this.filterOn;
 }

 
    
}



