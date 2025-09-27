import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, input } from '@angular/core';
import { Category } from 'src/app/interfaces/category.interface';
import { IonicSlides, IonCol } from '@ionic/angular/standalone';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonCol],
})
export class CategoriesComponent  implements OnInit {

  categories = input<Category[]>([]);

  constructor() { }

  ngOnInit() {}

}
