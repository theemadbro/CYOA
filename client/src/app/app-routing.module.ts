import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoardComponent } from './board/board.component'
import { HomeComponent } from './home/home.component'
import { ViewadvComponent } from './viewadv/viewadv.component'
import { ViewoneComponent } from './viewone/viewone.component'

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'board', component: BoardComponent },
	{ path: 'view', component: ViewadvComponent },
	{ path: 'viewone', component: ViewoneComponent },
	// {path: 'board/:id', component: BoardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
