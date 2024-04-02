import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eeducation';
  @Output() searchQueryChanged = new EventEmitter<string>();

  searchId!: string;
  searchQuery!: string;


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  search(query: string): void {
  console.log('Search query received:', query);
  this.searchQuery = query;
}

  onSearchChange(): void {
    this.searchQueryChanged.emit(this.searchId);
  }

}
