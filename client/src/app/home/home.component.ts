import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	constructor(private chat: ChatService) {}
	
	textarea: any;
	log: any;

	ngOnInit() {
		this.log = []
		this.chat.messages.subscribe(msg => {
    		console.log(msg);
    	})
	}

	sendMessage() {
		this.chat.sendMsg(this.textarea);
		this.log.push(this.textarea)
		this.textarea = ''
	}

}
