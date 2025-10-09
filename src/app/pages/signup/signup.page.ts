import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonFab, IonFabButton,
  IonItem, IonIcon, IonInput, IonLabel
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline, mailOutline, lockClosedOutline, chevronForward } from 'ionicons/icons';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [
    IonLabel, IonInput, IonIcon, IonItem, IonContent, RouterLink,
    IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonFab, IonFabButton
  ]
})
export class SignupPage implements OnInit {
  busy = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
  ) {
    addIcons({ personOutline, lockClosedOutline, chevronForward, mailOutline });
  }

  ngOnInit() {}

  async onSignup(form: NgForm) {
   
    if (form.invalid) return;
    const { name, email, password, confirm } = form.value;
    if (password !== confirm) {
      const alert = await this.alertCtrl.create({
        header: 'Sign up',
        message: 'Passwords do not match.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    this.busy = true;
    const loading = await this.loadingCtrl.create({ message: 'Creating account, wait a sec...' });
    await loading.present();

    
    this.authService.register({ email, password }).subscribe({
      next: async () => {
        await loading.dismiss();
        this.busy = false;
        this.router.navigateByUrl('/tabs/home', { replaceUrl: true });
      },
      error: async (err) => {
        console.error('signup ERR', err);
        console.log('FB message:', err?.error?.error?.message);
        await loading.dismiss();
        this.busy = false;

        
        const fbMsg = err?.error?.error?.message;
        const msg =
          fbMsg === 'EMAIL_EXISTS' ? 'This email is already in use.' :
          fbMsg === 'OPERATION_NOT_ALLOWED' ? 'Password sign-in is disabled in Firebase.' :
          fbMsg?.startsWith('WEAK_PASSWORD') ? 'Password must be at least 6 characters.' :
          'Please try again.';

        const alert = await this.alertCtrl.create({
          header: 'Sign up failed',
          message: msg,
          buttons: ['OK'],
        });
        await alert.present();
      }
    });
  }
}
