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
	singlepath: any;
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
  	this.scenepaths = []
  	this.singlepath = {}
  	this._route.params.subscribe((params: Params) => this.id = params['id'])
  	var onestory = this._httpService.singleGet(this.id)
  	onestory.subscribe(data => {
  		console.log(data)
  		this.story = data;
  		this.scene = data["nodeList"][0]
  		this.firstscene = this.scene
  		this.getPaths(0)
  	})
	  	
  }

  pathSelect(id) {
	this.dis = ""
	this.prev = this.story["nodeList"].indexOf(this.scene)
	this.scene = this.story["nodeList"][id]
	this.getPaths(id)
  }

  restartStory() {
  	this.dis = "true"
  	this.scene = this.firstscene
	this.getPaths(0)
  }

  goBack() {
  	this.scene = this.story["nodeList"][this.prev];
  	this.dis = "true"
  	this.getPaths(this.prev)
  }

  getPaths(index) {
  	this.scenepaths = []
  	for(var i = 0; i < this.story["nodeList"][index]["transitions"].length; i++) {
		this.singlepath["txt"] = this.story["nodeList"][index]["decisions"][i]
		this.singlepath["trans"] = this.story["nodeList"][index]["transitions"][i]
		this.scenepaths.push(this.singlepath)
		this.singlepath = {}
	}
  }

}