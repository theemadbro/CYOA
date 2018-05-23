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
  	this.scenetxt = "So here's the very beginning of the story, the introduction, the preface. Whatever you intend to call it, everything must come after it, for that is how a story works."
  	this.scenepaths = ["Switch branches and work on something else", "Start googling sockets", "Browse Twitter"]
  }

}
