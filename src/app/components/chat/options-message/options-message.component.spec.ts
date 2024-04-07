import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsMessageComponent } from './options-message.component';

describe('OptionsMessageComponent', () => {
  let component: OptionsMessageComponent;
  let fixture: ComponentFixture<OptionsMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionsMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OptionsMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
