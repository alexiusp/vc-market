import { Component, OnInit } from '@angular/core';
import { Parser } from './parser';
import { ParsersService } from './parsers.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
	providers: [ParsersService]
})
export class HomeComponent implements OnInit {
	errorMessage: string;
	parsers: Parser[];

  constructor(private parsersService : ParsersService) { }

  ngOnInit() {
		this.parsersService.getParsers()
		.subscribe(
			parsers => this.parsers = parsers,
			error =>  this.errorMessage = <any>error);
  }

}
