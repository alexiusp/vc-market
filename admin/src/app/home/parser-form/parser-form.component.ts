import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Parser, ParserItem } from '../../core/parser';

@Component({
  selector: 'vc-parser-form',
  templateUrl: './parser-form.component.html',
  styleUrls: ['./parser-form.component.css']
})
export class ParserFormComponent {
	private _savedCopy : ParserItem;
	private _parser : ParserItem;
	private _cities;

	@Input('parser')
	set parser(p: ParserItem) {
		console.log("set parser-form:", p);
		this._parser = p.clone();
		this._savedCopy = p;
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
			this._parser = this._savedCopy.clone();
			this._parser.isSelected = false;
			this.onChange.emit(this._parser);
		}
	}

	@Output() onDelete = new EventEmitter();
	delete() {
		if(!!this.onDelete) {
			this._parser.isSelected = false;
			this.onDelete.emit(this._parser);
		}
	}
}
