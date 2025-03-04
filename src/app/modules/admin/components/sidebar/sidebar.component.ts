import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  visible: boolean = false;

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate(['/admin/'+route]);
    this.visible = false;
  }

}
