import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Parser, ParserItem } from '../../core/parser';

@Component({
  selector: 'vc-parser',
  templateUrl: './parser.component.html',
  styleUrls: ['./parser.component.css']
})
export class ParserComponent {
	private _parser : ParserItem;
	@Input('parser')
	set parser(p: ParserItem) {
		console.log("set parser:", p);
		this._parser = p.clone();
	}
	get parser() {return this._parser}

  constructor() {
	}

	@Output() onSelect = new EventEmitter();

	select() {
		console.log("onSelect:", this._parser);
		this._parser.isSelected = !this._parser.isSelected;
		if(!!this.onSelect) this.onSelect.emit(this._parser);
	}
}
