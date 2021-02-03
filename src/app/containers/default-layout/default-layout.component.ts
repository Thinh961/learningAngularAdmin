import { Component, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';
import { User } from '../../_models/user';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;

  currentUser: User;

  constructor(@Inject(DOCUMENT) _document?: any,
    private router?: Router,
    private authenticationService?: AuthenticationService
  ) {
      this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
