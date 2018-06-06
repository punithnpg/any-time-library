import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Books } from '../../../models/books';
import { BooksService } from '../../../services/books.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  addBook: FormGroup;
  id = new Date().getTime();
  constructor(private fb: FormBuilder, private booksService: BooksService) {
    this.createForm();
  }

  createForm() {
    this.addBook = this.fb.group({
      title: ['', Validators.required],
      id: [this.id],
      authors: ['', Validators.required],
      isbn: ['', Validators.required],
      categories: ['', Validators.required],
      thumbnailUrl: ['', Validators.required],
      longDescription: ['', Validators.required]
    });
  }

  ngOnInit() {}

  save(model: Books) {
    console.log(model);
    this.booksService.addBook(model);
  }
}
