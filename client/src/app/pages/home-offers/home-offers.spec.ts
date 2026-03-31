import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOffers } from './home-offers';

describe('HomeOffers', () => {
  let component: HomeOffers;
  let fixture: ComponentFixture<HomeOffers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeOffers],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeOffers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
