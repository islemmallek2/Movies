import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cols: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.cols = [
      {field: 'title ', header: 'Title ', width: '100%'},
      {field: 'release_date', header: 'Release_date', width: '100%'},
      {field: 'type', header: 'Type', width: '100%'},
      {field: 'Director', header: 'Director', width: '100%'},
      {field: 'Action', header: 'Action', width: '100%'},
    ]

  }

}
