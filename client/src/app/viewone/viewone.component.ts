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
	scenetxt: any;
	scenepaths: any;
	// firstscene: any;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
  	private _httpService: HttpService) { }

  ngOnInit() {
  	this.story = {}
  	var onestory = this._httpService.singleGet("5b06f62ea28b914b34469196")
  	onestory.subscribe(data => {
  		console.log(data)
  		this.story = data;
  	})
  }

  pathSelect(id) {

  }

}