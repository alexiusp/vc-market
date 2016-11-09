import { VCity } from '../core/v-city.enum';

export interface IParser {
	//id?				: string,
	city      : string,
	login     : string,
	password  : string,
	timeout?  : number,
	lastrun?	: Date
}

export class Parser implements IParser {
	constructor(
		public city: string,
		public login: string,
		public password: string,
		public timeout?: number,
		public lastrun?: Date
	) {
		this._city = VCity[city];
		this._selected = false;
		this._editMode = false;
	}
	private _id : string;
	get id() {
		return this._id;
	}
	set id(val : string) {
		this._id = val;
	}

	private _city : VCity;

	private _selected : boolean;
	get selected() {
		return !!this._selected;
	}
	set selected(val : boolean) {
		this._selected = !!val;
	}
	private _editMode : boolean;
	get editMode() {
		return !!this._editMode;
	}
	set editMode(val : boolean) {
		this._editMode = !!val;
	}
}
