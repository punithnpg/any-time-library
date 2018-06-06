import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { map, startWith } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { BooksService } from '../../services/books.service';

export class State {
  constructor(
    public title: string,
    public authors: string,
    public categories: string,
    public id: number,
    public isbn: string,
    public longDescription: string,
    public pageCount: number,
    public shortDescription: string,
    public status: string,
    public thumbnailUrl: string
  ) {}
}
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  stateCtrl: FormControl;
  filteredStates: Observable<any[]>;

  states: State[];
  constructor(private bookService: BooksService) {
    this.bookService.getAllBooks().subscribe(books => {

      this.states = books;
      this.getStarted();
    });
    this.stateCtrl = new FormControl();
  }


  filterStates(name: string) {
    return this.states.filter(
      state => state.title.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }
  ngOnInit() {}

  getStarted() {
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map(state => (state ? this.filterStates(state) : this.states))
    );
  }
}
