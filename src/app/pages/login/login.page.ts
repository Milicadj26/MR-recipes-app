import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import {
  IonContent, IonItem, IonInput, IonIcon, IonLabel,
  IonFab, IonFabButton, IonTitle
} from '@ionic/angular/standalone';
import { LoadingController, AlertController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { personOutline, lockClosedOutline, chevronForward } from 'ionicons/icons';

import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterLink,
    IonContent, IonItem, IonInput, IonIcon, IonLabel,
    IonFab, IonFabButton, IonTitle
  ]
})
export class LogInPage {
  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
    addIcons({ personOutline, lockClosedOutline, chevronForward });
  }

  async onLogIn(logInForm: NgForm) {
    if (logInForm.invalid) return;

    const loading = await this.loadingCtrl.create({ message: 'Login in progress...' });
    await loading.present();

    this.authService.logIn(logInForm.value).subscribe({
      next: async (res) => {
        await loading.dismiss();

        
        if (res && res.idToken) {
          this.router.navigateByUrl('/tabs/home', { replaceUrl: true });
        } else {
          const alert = await this.alertCtrl.create({
            header: 'Login failed',
            message: 'Unexpected response from server.',
            buttons: ['OK']
          });
          await alert.present();
        }
      },
      error: async (err) => {
        await loading.dismiss();

        const fbMsg = err?.error?.error?.message;
        let msg = 'Please try again.';
        if (fbMsg === 'EMAIL_NOT_FOUND') msg = 'No user found with this email.';
        if (fbMsg === 'INVALID_PASSWORD') msg = 'Wrong password.';
        if (fbMsg === 'USER_DISABLED') msg = 'This account has been disabled.';
        if (fbMsg === 'INVALID_EMAIL') msg = 'Invalid email address.';

        const alert = await this.alertCtrl.create({
          header: 'Login failed',
          message: msg,
          buttons: ['OK']
        });
        await alert.present();

        logInForm.reset();
      }
    });
  }

}
