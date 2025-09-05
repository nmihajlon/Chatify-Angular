import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  searchTerm: string = '';

  @Output() searchChanged = new EventEmitter<string>();

  onSearchTermChange() {
    this.searchChanged.emit(this.searchTerm);
  }
}
