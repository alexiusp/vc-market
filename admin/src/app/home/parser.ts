import { VCity } from '../core/v-city.enum';

export interface IParser {
	city      : string,
	login     : string,
	password  : string,
	timeout   : number,
	lastrun		: Date
}

export class Parser implements IParser {
	private _city : VCity;
	public city : string;
	public login : string;
	public password : string;
	public timeout : number;
	public lastrun : Date;
	constructor(city: string, login: string, password: string, timeout?: number, lastrun?: Date) {
		this.city = city;
		this._city = VCity[city];
		this.login = login;
		this.password = password;
		this.timeout = timeout;
		this.lastrun = lastrun;
		this._selected = false;
		this._editMode = false;
	}
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
