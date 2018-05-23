import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
	constructor() {}

	story = {
		title: 'String',
		transitionTable: [Number],
		nodeList: [{content: 'hello world', note: 'start of story'}],
		rating: 0
	}

	ngOnInit() {
	}

}
