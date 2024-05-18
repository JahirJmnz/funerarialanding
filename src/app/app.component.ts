import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { IStaticMethods } from 'preline/preline';

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'webfuneraria';

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (isPlatformBrowser(this.platformId)) {
          setTimeout(() => {
            if (window.HSStaticMethods) {
              window.HSStaticMethods.autoInit();
            }
          }, 100);
        }
      }
    });
  }
}
