import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomUserComponent } from './random-user.component';

describe('RandomUserComponent', () => {
  let component: RandomUserComponent;
  let fixture: ComponentFixture<RandomUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
