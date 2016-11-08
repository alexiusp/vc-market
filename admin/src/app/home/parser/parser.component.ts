import { Component, Input } from '@angular/core';
import { IParser, Parser } from '../parser';

@Component({
  selector: 'vc-parser',
  templateUrl: './parser.component.html',
  styleUrls: ['./parser.component.css']
})
export class ParserComponent {
	private _parser;
	@Input('parser')
	set parser(p: Parser) {
		console.log("parser setter", p);
		this._parser = p;
	}
	get parser() {return this._parser}

  constructor() { }

}
