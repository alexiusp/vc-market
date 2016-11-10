import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Parser, ParserItem } from '../../core/parser';

@Component({
  selector: 'vc-parser',
  templateUrl: './parser.component.html',
  styleUrls: ['./parser.component.css']
})
export class ParserComponent {
	private _savedCopy : ParserItem;
	private _parser : ParserItem;
	private _cities;

	@Input('parser')
	set parser(p: ParserItem) {
		console.log("set parser:", p);
		this._parser = p;
		this._savedCopy = p.clone();
	}
	get parser() {return this._parser}

  constructor() {
		this._cities = ["vMoscow", "vBerlin", "vKiev"];
	}

	onSubmit() {
		if(!!this.onChange) {
			this.onChange.emit(this._parser);
		}
	}

	@Output() onChange = new EventEmitter();

	resetForm() {
		if(!!this.onChange) {
			this._savedCopy.inEdit = false;
			this._parser = this._savedCopy.clone();
			this.onChange.emit(this._savedCopy);
		}
	}
}
