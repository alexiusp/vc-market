import { Component, OnInit } from '@angular/core';
import { Parser, IParser } from './parser';
import { ParsersService } from './parsers.service';
import { VCity } from '../core/v-city.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
	providers: [ParsersService]
})
export class HomeComponent implements OnInit {
	errorMessage: string;
	parsers: IParser[];
	newItem: Parser;

  constructor(private parsersService : ParsersService) {
		
	}

	addParser = function() {
		this.newItem = new Parser(VCity[VCity.vMoscow], "Citizen", "");
		this.newItem.selected = false;
		this.newItem.editMode = true;
	}

  ngOnInit() {
		this.parsersService.getParsers()
		.subscribe(
			parsers => this.parsers = parsers,
			error =>  this.errorMessage = <any>error
		);
  }

}
