import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class QuestionnaireService {
	constructor(private _http: HttpClient) { }

	getQuestionnaire(url: string) {
		return this._http.get(url);
	}
}
