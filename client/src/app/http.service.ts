import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class HttpService {
	constructor(private _http: HttpClient) {}

	getAllMain() {
    	console.log('get all pets! - from http.service.ts')
	    return this._http.get('/story');
	}
	singleGet(id) {
		return this._http.get('/story/'+id)
	}
	singleRemove(id) {
		return this._http.delete('/story/'+id)
	}
	addMain(story) {
		return this._http.post('/story', story)
	}
	// addSubschema(id, inp) {
	// 	return this._http.put('/mainschema/'+id+'/subschema', inp)
	// }
	// editMain(story) {
	// 	console.log('LETS EDIT THIS >>>',story)
	// 	console.log(story._id)
	// 	return this._http.put('/story/'+story._id, story)
	// }
	// likestory(id) {
	// 	console.log(id)
	// 	return this._http.put('/story/'+id+'/like', {"do":"like"})
	// }
	// namecheck(story) {
	// 	return this._http.get('/story/check', story)
	// }
}
