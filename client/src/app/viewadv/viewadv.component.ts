import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-viewadv',
  templateUrl: './viewadv.component.html',
  styleUrls: ['./viewadv.component.css']
})
export class ViewadvComponent implements OnInit {
	stories: any;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
  	this.stories = []
  	var getstories = this._httpService.getAllMain()
  	getstories.subscribe(data => {
  		this.stories = data["data"]
  	})
  }

}
