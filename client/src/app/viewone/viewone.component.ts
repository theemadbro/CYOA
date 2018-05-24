import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  	this.story = {}
  	this.scenetxt = ""
  	this.scenepaths = []
  	// this.firstscene = {}
  	this.story["title"] = "CSS Wonders"
  	this.story["author"] = "Zoe Chastain"
  	this.scenetxt = "You open up your laptop and prepare to start working. Remembering you last worked with sockets, you cringe a bit, dread filling you."
  	this.scenepaths = ["Switch branches and work on something else", "Start googling sockets", "Browse Twitter"]
  }

}
