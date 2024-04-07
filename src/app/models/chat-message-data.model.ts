import { Type } from '@angular/core';

/**
 * Model used for dynamic rendering of the components in the chat
 */
export interface ChatMessageData {
  /**
   * ID of the message
   */
  id: string;

  /**
   * Date and time of the message
   */
  dt: Date;

  /**
   * Author of the message
   */
  sender: string;

  /**
   * Component to be rendered
   */
  component: Type<any>;

  /**
   * Input values for the @component to be injected
   */
  inputs: Record<string, unknown>;
}
