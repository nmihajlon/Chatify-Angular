import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWrapperComponent } from './user-wrapper.component';

describe('UserWrapperComponent', () => {
  let component: UserWrapperComponent;
  let fixture: ComponentFixture<UserWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
