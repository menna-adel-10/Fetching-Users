import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
   menuItems = [
    { icon: 'home', text: 'Home', link: '' },
    { icon: 'shopping_cart', text: 'Market Place', link: '' },
    { icon: 'notifications', text: 'Notifications', link: '' },
    { icon: 'person', text: 'Profile', link: '' }
   ];
  
  
}
