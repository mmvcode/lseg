import { ChatService } from './../../services/chat.service';
import {
  AfterContentChecked,
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { LsegLogoComponent } from '../lseg-logo/lseg-logo.component';
import { ChatMessageData } from '../../models/chat-message-data.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lseg-chat',
  standalone: true,
  imports: [CommonModule, LsegLogoComponent, MatIconModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent
  implements OnInit, OnDestroy, AfterContentChecked, AfterViewChecked
{
  // Holds all the messages
  messages: ChatMessageData[] = [];

  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private chatService: ChatService,
    private changeDetector: ChangeDetectorRef
  ) {}

  /**
   *
   * Chatbot user (LSEG)
   *
   * @returns
   */
  getChatUser(): string {
    return this.chatService.CHATBOT_USER;
  }

  /**
   *
   * User interacting with chatbot
   *
   * @returns
   */
  getUser(): string {
    return this.chatService.USER;
  }

  ngOnInit(): void {
    this.init();
    this.changeDetector.detectChanges();
  }

  /**
   * Starting chat messages
   */
  init() {
    this.chatService.messages
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((msgs) => {
        this.messages = msgs;
        this.scrollToBottom();
      });

    this.chatService.addTextMessage(
      this.chatService.CHATBOT_USER,
      'Hello! Welcome to LSEG. I am here to help you.'
    );

    this.chatService.addStockExchangeOptions();
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  /**
   * Scroll the chat to bottom every time a new message is added
   */
  scrollToBottom(): void {
    const element = window.document.getElementById('scrollBottom');

    element?.scrollIntoView({
      behavior: 'smooth',
    });
  }
}
