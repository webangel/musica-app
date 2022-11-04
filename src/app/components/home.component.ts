import { Component, OnInit, Input} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// import { GLOBAL } from '../services/global';
// import { UserService } from '../services/user.service';


 
 @Component({
 	selector: 'home',
 	templateUrl: '../views/home.html',
 	// providers: [UserService]
 })

 export class HomeComponent implements OnInit{
	public titulo: string;
	// public identity;
	// public token;
	// public url: string;
	// private display:any = 'none';

 		constructor(

 				private _route: ActivatedRoute,
 				private _router: Router,
 				//private _userService: UserService
 			){

 			this.titulo = 'Inicio';
 			// this.identity = this._userService.getIdentity();
 			// this.token = this._userService.getToken();
 			// this.url = GLOBAL.url;

 			// if(this.identity){
 			// 	this.display = 'block';
 			// }
 		}

 		ngOnInit(){
 			console.log('home.component.ts cargado');
 			//this.homeInit();
 			//Conseguir el listado de los artistas
 		}

 		// ngAfterViewInit(){
 		// 	this.homeInit();
 		// }

 		// homeInit(){
 		// 	if(this.identity){
 		// 		this.display = 'block';
 		// 	}else{
 		// 		this.display = 'none';
 		// 	}
 		// }
 }
