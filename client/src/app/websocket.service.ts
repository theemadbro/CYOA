import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/';
import * as Rx from 'rxjs';
import { environment } from '../environments/environment'


@Injectable({
	providedIn: 'root'
})
export class WebsocketService {

	private socket;

	constructor() { }

	connect(): Rx.Subject<MessageEvent> {
		this.socket = io('25.9.29.81:8000')

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
