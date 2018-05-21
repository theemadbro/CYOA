import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/';
import * as Rx from 'rxjs/Rx';
import { environment } from '../environments/environment'


@Injectable({
	providedIn: 'root'
})
export class WebsocketService {

	private socket;

	constructor() { }

	connect(): Rx.Subject<MessageEvent> {
		this.socket = io(environment.ws_url)

		let observable = new Observable(observer => {
			this.socket.on('message', (data) => {
				console.log("Recieved a message from websocket server")
				observer.next(data);
			})
			return () => {
				this.socket.disconnect();
			}
		})
		
		let observer = {
			next: (data: Object) => {
				this.socket.emit('message', JSON.stringify(data));
			},
		}
		return Rx.Subject.create(observer, observable);
	}
}
