import { Component } from '@angular/core';
import {
  IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel
} from '@ionic/angular/standalone';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';

import {add, heartOutline, homeOutline, listOutline, searchOutline} from 'ionicons/icons'
import { filter } from 'rxjs';

@Component({
  selector: 'app-tabs',
  standalone: true,
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  imports: [
    IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel, RouterLink
  ],
})
export class TabsPage {
    constructor(private router: Router) {

      this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        
        if (event.url.startsWith('/tabs/')) {
          console.log('Refreshed after nav:', event.url);
          
        }
      });



        addIcons({
          'home-outline': homeOutline,
          'list-outline': listOutline,
          'search-outline': searchOutline,
          'heart-outline': heartOutline,
          'add': add,
        });
   }

   

}
