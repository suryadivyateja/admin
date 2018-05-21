import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileOrgComponent } from './profile-org.component';

describe('ProfileOrgComponent', () => {
  let component: ProfileOrgComponent;
  let fixture: ComponentFixture<ProfileOrgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileOrgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
