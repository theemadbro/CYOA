import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
	constructor(private _httpService: HttpService,
		private _route: ActivatedRoute,
		private _router: Router
	) {}
	id = '5b06575956282e3954d2b2ac';
	story: any;
	nlist = [];
	show = true;

	ngOnInit() {
		this.getstory(this.id)
	}
	getstory(id) {
		let info = this._httpService.singleGet(id)
		info.subscribe(data => { 
			console.log(data)
			this.story = data 
			console.log(this.story)
			this.nlist = this.story.nodeList
			console.log(this.nlist)
			for(var i=0; i < this.nlist.length; i++){
				console.log(this.nlist[i].transitions.length)
			}
		})
	}
	public list = [
	    {
	      title: 'great grandparent',
	      children: [
	        {
	          title: 'childless grandsibiling',
	          children: []
	        },
	        {
	          title: 'grandparent',
	          children: [
	            {
	              title: 'childless sibiling',
	              children: []
	            },
	            {
	              title: 'another childless sibiling',
	              children: []
	            },
	            {
	              title: 'parent',
	              children: [
	                {
	                  title: 'child',
	                  children: []
	                },
	                {
	                  title: 'another child',
	                  children: []
	                },
	              ]
	            },
	            {
	              title: 'another parent',
	              children: [
	                {
	                  title: 'child',
	                  children: []
	                },
	              ]
	            },
	          ]
	        },
	        {
	          title: 'another grandparent',
	          children: [
	            {
	              title: 'parent',
	              children: [
	                {
	                  title: 'child',
	                  children: []
	                },
	                {
	                  title: 'another child',
	                  children: []
	                },
	                {
	                  title: 'a third child',
	                  children: []
	                },
	                {
	                  title: 'teen mother',
	                  children: [
	                    {
	                      title: 'accident',
	                      children: []
	                    },
	                  ]
	                },
	              ]
	            },
	          ]
	        },
	      ]
	    },
	];
}
