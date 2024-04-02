import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit{

 @Input() searchQuery!: string;
  users: any[] = [];
  currentPage: number = 1;
  isLoading: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    console.log('Search query received:', this.searchQuery);
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.currentPage)
      .subscribe(users => {
        this.users = users.data;
        this.isLoading = true;
      });
    (error: any) => {
          console.error('Error loading users:', error);
          this.isLoading = false;
        }

  }

  filterUsers(): any[] {
    if (!this.searchQuery) {
      return this.users;
    }
    return this.users.filter(user =>
      user.first_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      user.last_name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
