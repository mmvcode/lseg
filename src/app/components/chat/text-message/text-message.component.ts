import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';

/**
 * Component to display simple text messages in the chat
 */
@Component({
  selector: 'lseg-text-message',
  standalone: true,
  imports: [],
  templateUrl: './text-message.component.html',
  styleUrl: './text-message.component.scss',
})
export class TextMessageComponent implements OnInit, AfterContentChecked {
  /**
   *Text to be displayed
   *
   * @type {string}
   * @memberof TextMessageComponent
   */
  @Input('text') text!: string;

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.changeDetector.detectChanges();
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
}
