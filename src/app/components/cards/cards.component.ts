import { AfterViewInit, Component, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../services/user.service';
import { User } from '../../user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
})
export class CardsComponent implements OnInit, AfterViewInit {
  @Input() searchQuery!: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoading: boolean = false;
   isSmallScreen: boolean = false;
  usersList: User[] = [];
  currentPage: number = 1;
  pageEvent!: PageEvent;

  displayedColumns: string[] = ['id', 'name', 'email', 'view'];
  dataSource!: MatTableDataSource<User>;

  color = '#374151';
  text_color = '#ffffff';
  bg = '#95a3af';

   length = 2;
  pageSize = 12;
  pageIndex = 0;
  pageSizeOptions = [1, 6, 12];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;



  constructor(private userService: UserService,
    private router: Router, private renderer: Renderer2) {
     this.dataSource = new MatTableDataSource<User>();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isSmallScreen = window.innerWidth <= 768; 
  }

  ngOnInit(): void {
    this.loadUsers();

  }

  ngAfterViewInit(): void {
    if (this.dataSource && this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  loadUsers() {
    this.userService.fetchUsers().subscribe(
      (res: any) => {
        this.usersList = res.data;
        this.dataSource = new MatTableDataSource<User>(this.usersList);
        this.dataSource.paginator = this.paginator;

      },
      (error: any) => {
        console.error('Error loading users:', error);

      }
    );
  }

   viewUser(id: number) {
    this.isLoading = true;
    this.router.navigate(['/user-details', id]).then(() => {
      this.isLoading = false;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    console.log(filterValue);
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
}
