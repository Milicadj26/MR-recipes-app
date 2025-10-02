import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone';
import {addIcons} from 'ionicons';
import {chevronForward} from 'ionicons/icons';
import { RouterLink } from '@angular/router';

import { NO_ERRORS_SCHEMA } from '@angular/core';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
  standalone: true,
  imports: [
    IonIcon, IonContent, IonTitle, RouterLink,
    CommonModule, FormsModule, IonFab, IonFabButton
]
})
export class LandingPage implements OnInit {

  constructor() { 

    addIcons({chevronForward});


  }

  ngOnInit() {
  }

}
