import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith, switchMap } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../user';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent implements OnInit{

  filterUsers!: Observable<User[]>
  formControl = new FormControl('');

  constructor(private userService: UserService) {}

 ngOnInit(): void {
    this.filterUsers = this.formControl.valueChanges.pipe(
      startWith(''),
      switchMap(value => this.userService.getUsersList(value || ''))
    );
  }


  selectOption(optionValue: User): void {
    this.formControl.setValue(`${optionValue.first_name} ${optionValue.last_name}`);
  }

}
