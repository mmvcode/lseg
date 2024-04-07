import { Component, Input } from '@angular/core';

@Component({
  selector: 'lseg-lseg-logo',
  standalone: true,
  imports: [],
  templateUrl: './lseg-logo.component.html',
  styleUrl: './lseg-logo.component.scss',
})
export class LsegLogoComponent {
  @Input('location') location!: string;
}
