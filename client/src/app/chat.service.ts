import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable, Subject } from 'rxjs'
import 'rxjs/operator/map';
import 'rxjs/add/operator/map';

@Injectable({
	providedIn: 'root'
})
export class ChatService {

	messages: Subject<any>;

	constructor(private wsService: WebsocketService) { 
		this.messages = <Subject<any>>wsService
		.connect()
		.map((response: any): any => {
			return response;
		})
	}
	sendMsg(msg) {
		this.messages.next(msg);
	}
}
