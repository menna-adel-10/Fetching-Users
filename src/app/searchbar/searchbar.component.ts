import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith, switchMap } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent implements OnInit{

  filterUsers!: Observable<User[]>
  formControl = new FormControl('');

  constructor(private userService: UserService, private router: Router) {}

 ngOnInit(): void {
    this.filterUsers = this.formControl.valueChanges.pipe(
      startWith(''),
      switchMap(value => this.userService.getUsersList(value || ''))
    );
  }


 selectUser(userId: number) {
    this.router.navigate(['/userDetail', userId]);
  }

}
