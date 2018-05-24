import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { WebsocketService } from './websocket.service'
import { ChatService } from './chat.service';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { BoardComponent } from './board/board.component';
import { HomeComponent } from './home/home.component';
import { ViewadvComponent } from './viewadv/viewadv.component';
import { ViewoneComponent } from './viewone/viewone.component';

@NgModule({
    declarations: [
        AppComponent,
        BoardComponent,
        HomeComponent,
        ViewadvComponent,
        ViewoneComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [
        WebsocketService,
        ChatService,
        HttpService,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
