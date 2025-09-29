import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, inject, input } from '@angular/core';
import { Category } from 'src/app/interfaces/category.interface';
import { IonicSlides, IonCol, IonThumbnail } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonCol],
})
export class CategoriesComponent  implements OnInit {

  categories = input<Category[]>([]);
  private router = inject(Router);

  open(c: Category, ev?: Event) {
    ev?.stopPropagation?.();
    this.router.navigate(['/tabs/category', c.key]);
  }

  constructor() { }

  ngOnInit() {}

}
