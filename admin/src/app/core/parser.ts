import { Selectable } from './selectable'
import { Clonable } from './clonable';

export interface Parser {
	city      : string;
	login     : string;
	password  : string;
	timeout?  : number;
	lastrun?	: Date;
	_id?			: string;
}

export class ParserItem extends Selectable implements Clonable {
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
		let clonedParser = <Parser>{
			city : this._parser.city,
			login: this._parser.login,
			password: this._parser.password
		}
		if(!!this._parser.timeout) clonedParser.timeout = this._parser.timeout;
		if(!!this._parser.lastrun) clonedParser.lastrun = this._parser.lastrun;
		if(!!this._parser._id) clonedParser._id = this._parser._id;
    var cloneObj = new ParserItem(clonedParser);
		cloneObj.isSelected = this.isSelected;
    return cloneObj;
	}
}
