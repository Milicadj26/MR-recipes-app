import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { homeOutline, searchOutline, listOutline } from 'ionicons/icons';



// Ionic standalone components used in tabs.page.html
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet, IonTab, IonButton, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-tabs',
  standalone: true,
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  imports: [IonToolbar, IonButton, IonTab, 
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    RouterLink,
  ],
})
export class TabsPage{
  constructor() {
    addIcons({
      'home-outline': homeOutline,
      'search-outline': searchOutline,
      'list-outline': listOutline,
    });
  }
}
