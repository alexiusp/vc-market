import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Parser } from '../core/parser';

@Injectable()
export class ParsersService {
	private apiUrls = {
		"parsers" : "api/parsers"
	}
  constructor(private http: Http) { }


	getParsers(): Observable<Parser[]> {
		return this.http.get(this.apiUrls.parsers)
			.map(this.extractData)
			.catch(this.handleError);
	}
	addParser(p : Parser): Observable<Parser[]> {
		return this.http.post(this.apiUrls.parsers, p)
			.map(this.extractData)
			.catch(this.handleError);
	}
	private extractData(res: Response) {
		let body = res.json();
		console.log("data received:", body.data);
		return body.data || { };
	}
	private handleError (error: Response | any) {
		// In a real world app, we might use a remote logging infrastructure
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		console.error(errMsg);
		return Observable.throw(errMsg);
	}
}
