import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 isLoading = true;

  constructor() {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000)
  }

}
