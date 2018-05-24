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

  constructor(private _route: ActivatedRoute,
    private _router: Router,
  	private _httpService: HttpService) { }

  ngOnInit() {
  	this.story = {}
  	this.scene = {}
  	this.firstscene = {}
  	var onestory = this._httpService.singleGet("5b06fa1da62e7e1c2cf62d77")
  	onestory.subscribe(data => {
  		console.log(data)
  		this.story = data;
  		this.scene = data["nodeList"][0]
  		this.firstscene = this.scene
  		this.scenepaths = data["nodeList"][0]["transitions"]
  		this.prev = this.scene
  	})
  }

  pathSelect(id) {

  }

}