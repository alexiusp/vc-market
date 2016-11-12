import { Component, OnInit } from '@angular/core';
import { Parser, ParserItem } from '../core/parser';
import { ParsersService } from './parsers.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
	providers: [ParsersService]
})
export class HomeComponent implements OnInit {
	errorMessage: string;
	parsers: ParserItem[];
	selectedItem: ParserItem;

  constructor(private parsersService : ParsersService) {
	}

	addParser() {
		console.log("addParser");
		this.selectedItem = new ParserItem();
		this.selectedItem.isSelected = true;
	}

	changeParser(p : ParserItem) {
		console.log("changeParser", p)
		if(p.isSelected) {
			if(this.selectedIndex >= 0) {

			} else {
				this.parsersService.addParser(p.parser)
				.subscribe(
					parser => {this.refresh();},
					error => this.errorMessage = <any>error
				);
			}
		} else {
			console.log("resetSelected");
			if(this.selectedIndex >= 0) this.parsers[this.selectedIndex] = p;
			this.resetSelected();
		}
	}
	resetSelected() {
		if(!!this.parsers)
			for(let p of this.parsers) p.isSelected = false;
		this.selectedItem = undefined;
		this.selectedIndex = undefined;
		console.log("resetSelected", this.parsers);
	}
	refresh() {
		this.parsersService.getParsers()
		.subscribe(
			(parsers : Parser[]) => {
				let _parsers = [];
				for(let p of <Parser[]>parsers) {
					let pi = new ParserItem(p);
					_parsers.push(pi);
				}
				this.parsers = _parsers;
				console.log("binding", _parsers);
			},
			error =>  this.errorMessage = <any>error
		);
	}
  ngOnInit() {
		this.resetSelected();
		this.refresh();
  }

	selectedIndex : number;
	selectParser(parser, index) {
		console.log("select", parser, index, this.parsers[index]);
		this.resetSelected();
		this.parsers[index] = parser;
		if(this.parsers[index].isSelected) {
			this.selectedItem = parser;
			this.selectedIndex = index;
		}
	}
}
