import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFab, IonFabButton, IonItem, IonIcon, IonInput } from '@ionic/angular/standalone';
import {addIcons} from 'ionicons';
import {personOutline, lockClosedOutline, chevronForward } from 'ionicons/icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  standalone: true,
  imports: [IonInput, IonIcon, IonItem, IonContent, RouterLink,
    IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonFab, IonFabButton
  ]
})
export class ResetPasswordPage implements OnInit {

  constructor() {
      addIcons({personOutline,lockClosedOutline,chevronForward}); }

  ngOnInit() {
  }

}
