import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewadvComponent } from './viewadv.component';

describe('ViewadvComponent', () => {
  let component: ViewadvComponent;
  let fixture: ComponentFixture<ViewadvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewadvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewadvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
