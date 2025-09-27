import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-heading',
  standalone: true,
  template: `
    <div class="heading-row">
      <strong class="title">{{ heading }}</strong>
      <button type="button" class="see-all">{{ buttonTitle }}</button>
    </div>
  `,
  styleUrls: ['./list-heading.component.scss'],
})
export class ListHeadingComponent {
  @Input() heading = 'Recommended';
  @Input() buttonTitle = 'See all >';
}

