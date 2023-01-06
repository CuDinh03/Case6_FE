import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusService } from './status.service';

describe('ServiceComponent', () => {
  let component: StatusService;
  let fixture: ComponentFixture<StatusService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
