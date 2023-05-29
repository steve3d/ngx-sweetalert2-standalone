import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { SwalComponent, SwalDirective, SwalPortalDirective } from 'lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NgIf, RouterLink, RouterLinkActive, RouterOutlet, SwalDirective, SwalComponent, SwalPortalDirective]
})
export class AppComponent {
  public modalFireCondition = false;

  public isSwalVisible = false;

  private readonly dynamicTextChunks = 'This dynamic content is controlled by Angular'.split(' ');

  private dynamicTextChunksIntervalHandle?: any;

  private currentTextChunkOffset = 0;

  public constructor() {
  }

  public get currentTextChunk(): string {
    return this.dynamicTextChunks[this.currentTextChunkOffset % this.dynamicTextChunks.length];
  }

  public startDynamicTextRotation(): void {
    this.currentTextChunkOffset = 0;

    this.dynamicTextChunksIntervalHandle = setInterval(() => this.currentTextChunkOffset++, 1000);
  }

  public stopDynamicTextRotation(): void {
    clearInterval(this.dynamicTextChunksIntervalHandle);
  }
}
