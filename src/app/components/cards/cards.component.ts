import { Component } from '@angular/core';
import { User } from '../../user';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html'
})
export class CardsComponent {

   users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getData().subscribe(users => {
      this.users = users;
    });
  }
}
