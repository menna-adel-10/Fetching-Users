import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html'
})
export class UserDetailsComponent implements OnInit {
   isLoading: boolean = false;
  user: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
   this.isLoading = true;

  const idParam = this.route.snapshot.paramMap.get('id');
  if (idParam) {
    const id = +idParam;
    this.userService.getUser(id)
      .subscribe(
        user => {
          this.user = user.data;
          this.isLoading = false;
        },
        error => {
          console.error('Error loading user:', error);
          this.isLoading = false; 
        }
      );
  }
  }

  goBack(): void {
    this.location.back();
  }
}
