import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent {
  
@Output() searchQueryChanged = new EventEmitter<string>();
  searchId!: string;
  isLoading = true;

  constructor() {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000)
  }

  onSearchChange(): void {
    this.searchQueryChanged.emit(this.searchId);
  }


  
}
