import {
  AfterViewInit,
  Component,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TemplatePortal, PortalModule } from '@angular/cdk/portal';
import { ChatComponent } from './components/chat/chat.component';
import { LsegLogoComponent } from './components/lseg-logo/lseg-logo.component';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    PortalModule,
    ChatComponent,
    LsegLogoComponent,
  ],
})
export class AppComponent implements AfterViewInit {
  title = 'lseg';

  // Chat component container
  @ViewChild('chatPortalContent')
  chatPortalContent!: TemplateRef<unknown>;

  chatPortal!: TemplatePortal<any>;
  constructor(private _viewContainerRef: ViewContainerRef) {}

  ngAfterViewInit() {
    this.chatPortal = new TemplatePortal(
      this.chatPortalContent,
      this._viewContainerRef
    );
  }
}
