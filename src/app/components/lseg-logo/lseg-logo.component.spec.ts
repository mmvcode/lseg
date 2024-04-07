import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LsegLogoComponent } from './lseg-logo.component';

describe('LsegLogoComponent', () => {
  let component: LsegLogoComponent;
  let fixture: ComponentFixture<LsegLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LsegLogoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LsegLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
