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
	newItem: ParserItem;

  constructor(private parsersService : ParsersService) {
	}

	addParser() {
		console.log("addParser");
		this.newItem = new ParserItem();
		this.newItem.isSelected = false;
		this.newItem.inEdit = true;
	}

	changeParser(p : ParserItem) {
		console.log("changeParser", p)
		if(!!p && p.inEdit) {
			this.parsersService.addParser(p.parser)
			.subscribe(
				parser => {this.refresh();},
				error => this.errorMessage = <any>error
			);
		} else this.newItem = undefined;
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
		this.refresh();
  }

}
