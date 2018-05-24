import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-viewone',
  templateUrl: './viewone.component.html',
  styleUrls: ['./viewone.component.css']
})
export class ViewoneComponent implements OnInit {
	story: any;
	scene: any;
	scenepaths: any;
	firstscene: any;
	prev: any;
	dis: any;
	id: any;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
  	private _httpService: HttpService) { }

  ngOnInit() {
  	this.prev = {}
  	this.dis = "true"
  	this.story = {}
  	this.scene = {}
  	this.firstscene = {}
  	this._route.params.subscribe((params: Params) => this.id = params['id'])
  	var onestory = this._httpService.singleGet(this.id)
  	onestory.subscribe(data => {
  		console.log(data)
  		this.story = data;
  		this.scene = data["nodeList"][0]
  		this.firstscene = this.scene
  		this.scenepaths = data["nodeList"]
  	})
  }

  pathSelect(id) {
  	var i = 0;
  	while(i < this.story["nodeList"].length) {
  		if(this.story["nodeList"][i]["_id"] == id) {
  			this.dis = ""
  			this.prev = this.scene
  			this.scene = this.story["nodeList"][i]
  		}
  		i++
  	}
  }

  restartStory() {
  	this.dis = "true"
  	this.scene = this.firstscene
  }

  goBack() {
  	this.scene = this.prev;
  	this.dis = "true"
  }

}