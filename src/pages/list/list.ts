import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage implements OnInit{
  quote: any;

  constructor(private http: Http) {}

  ngOnInit() {
    this.http.get('http://ron-swanson-quotes.herokuapp.com/v2/quotes').subscribe(res => {
      this.quote = res.json();
    })
  }


}
