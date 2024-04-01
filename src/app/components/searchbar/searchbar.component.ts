import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../user';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
  listArray: User[] = [];
  tempListArray: User[] = [];
  searchForm!: FormGroup;

  isSearchBarVisible: boolean = false;

  constructor(private userService: UserService, private breakpointObserver: BreakpointObserver, private fb: FormBuilder, private router: Router) { }


  toggleSearchBar() {
    this.isSearchBarVisible = !this.isSearchBarVisible;
  }
  
  ngOnInit() {
    this.initForm();
    this.getNames();
  }

  initForm() {
    this.searchForm = this.fb.group({
      searchQuery: [''],
    });
    this.searchForm.valueChanges.subscribe(() => {
      this.searchFilter();
    });
  }

  getNames() {
    this.userService.getUsersList().subscribe(
      (response: User[]) => {
        this.listArray = response;
        this.tempListArray = [...this.listArray];
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  searchFilter() {
    const searchQuery = this.searchForm.value.searchQuery.toLowerCase();
    this.tempListArray = this.listArray.filter(user => {
      const combinedProperties = `${user.first_name} ${user.last_name} ${user.email}`.toLowerCase();
      return combinedProperties.includes(searchQuery);
    });
  }

  selectUser(userId: number) {
    this.router.navigate(['/user-detail', userId]);
  }
}
