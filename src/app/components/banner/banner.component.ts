import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonicSlides} from '@ionic/angular/standalone';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BannerComponent  implements OnInit {

  swiperModules = [IonicSlides];
  bannerImages?: any[] = [
    {id: '1', banner: 'assets/banners/1.png'},
    {id: '2', banner: 'assets/banners/2.png'},
    {id: '3', banner: 'assets/banners/3.png'},

  ]; 

  constructor() { }

  ngOnInit() {}

}
