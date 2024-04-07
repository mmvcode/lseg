import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ButtonOption } from '../../../models/button-option.model';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

/**
 * Class to render clickable options in the chat
 */
@Component({
  selector: 'lseg-options-message',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatListModule],
  templateUrl: './options-message.component.html',
  styleUrl: './options-message.component.scss',
})
export class OptionsMessageComponent {
  /**
   * The message to be displayed before the options
   *
   * @type {string}
   * @memberof OptionsMessageComponent
   */
  @Input('message') message!: string;

  /**
   * The actual options
   *
   * @type {ButtonOption[]}
   * @memberof OptionsMessageComponent
   */
  @Input('options') options!: ButtonOption[];

  /**
   * Callback function to be called when an option is clicked
   *
   * @type {Function}
   * @memberof OptionsMessageComponent
   */
  @Input('onOptionClicked') onOptionClicked!: Function;
}
