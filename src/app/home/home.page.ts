import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import{FormsModule} from '@angular/forms';
import {
  IonHeader,  IonToolbar, IonTitle, IonButtons, IonMenuButton,
  IonContent, IonIcon, IonSearchbar, IonButton, IonItem, IonLabel,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';

import { homeOutline, settings, searchOutline, optionsOutline, listOutline, chevronDownOutline } from 'ionicons/icons';
import { RouterLink } from '@angular/router';
import { ListHeadingComponent } from '../components/list-heading/list-heading.component';
import { BannerComponent } from "../components/banner/banner.component"; // ← path matters


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    // ionic components used in the template:
    IonHeader, IonToolbar, RouterLink, IonTitle, IonButtons, IonLabel, IonMenuButton,
    IonContent, IonSearchbar, IonButton, IonIcon, IonItem,
    // for [(ngModel)] on the searchbar: 
    FormsModule, ListHeadingComponent,
    BannerComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage {
  constructor() {
      addIcons({
        chevronDownOutline,
        'home-outline': homeOutline,
        'search-outline': searchOutline,
        'list-outline': listOutline,
        'options-outline': optionsOutline,
        'settings' : settings,
      });
 }
 query = '';

 
 filterOn = false;
 toggleFilter(){
  this.filterOn = !this.filterOn;
 }

 
    
}



