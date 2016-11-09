import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IParser, Parser } from '../parser';
import { VCity, VCityList } from '../../core/v-city.enum';

@Component({
  selector: 'vc-parser',
  templateUrl: './parser.component.html',
  styleUrls: ['./parser.component.css']
})
export class ParserComponent {
	private _savedCopy : Parser;
	private _parser : Parser;
	private _cities;

	@Input('parser')
	set parser(p: Parser) {
		console.log("parser setter", p);
		this._parser = p;
		this._savedCopy = p;
		this._cities = [];
		for(let c of VCityList) this._cities.push(c);
	}
	get parser() {return this._parser}

  constructor() { }

	onSubmit() {
		/*if() {
			console.log("submit");
		}*/
	}

	@Output() onChange = new EventEmitter();

}
