import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  @Input('group') group;
  public authorForm: FormGroup;
  constructor() { }

  ngOnInit() {
    console.log(this.group);
  }

}
