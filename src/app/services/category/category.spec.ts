import { TestBed } from '@angular/core/testing';

import { CategoryService } from 'src/app/services/category/category';

describe('Category', () => {
  let service: CategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
