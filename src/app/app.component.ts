import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import{register} from 'swiper/element/bundle';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';
register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  onLogOut() {
    this.authService.logOut();
    this.router.navigateByUrl('/log-in')
  }
}
