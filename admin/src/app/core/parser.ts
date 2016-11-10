import { Editable } from './editable'
import { Clonable } from './clonable';

export interface Parser {
	city      : string;
	login     : string;
	password  : string;
	timeout?  : number;
	lastrun?	: Date;
	_id?			: string;
}

export class ParserItem extends Editable implements Clonable {
	private _parser : Parser;
	constructor(p?: Parser) {
		super();
		if(!!p) {
			this._parser = <Parser>p;
		} else {
			this._parser = <Parser>{
				city : "vMoscow",
				login: "Citizen",
				password:"123456"
			};
		}
	}
	get parser() {return this._parser};
	set parser(p : Parser) {this._parser = p;}

	public clone(): ParserItem {
    var cloneObj = new ParserItem(this._parser);
		cloneObj.isSelected = this.isSelected;
		cloneObj.inEdit = this.inEdit;
    return cloneObj;
	}
}
