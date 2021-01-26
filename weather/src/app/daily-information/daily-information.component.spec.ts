import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyInformationComponent } from './daily-information.component';

describe('DailyInformationComponent', () => {
  let component: DailyInformationComponent;
  let fixture: ComponentFixture<DailyInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
