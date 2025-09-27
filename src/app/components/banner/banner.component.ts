import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, input } from '@angular/core';
import { IonicSlides} from '@ionic/angular/standalone';
import { Banner } from 'src/app/interfaces/banner.interface';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BannerComponent  implements OnInit {

  swiperModules = [IonicSlides];
  bannerImages = input<Banner[]>([]);

  constructor() { }

  ngOnInit() {}

}
