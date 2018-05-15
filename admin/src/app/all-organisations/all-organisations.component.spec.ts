import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOrganisationsComponent } from './all-organisations.component';

describe('AllOrganisationsComponent', () => {
  let component: AllOrganisationsComponent;
  let fixture: ComponentFixture<AllOrganisationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllOrganisationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllOrganisationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
