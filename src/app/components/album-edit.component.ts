import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { UploadService } from '../services/upload.service';
import { AlbumService } from '../services/album.service';
import { Artist } from '../models/artist';
import { Album } from '../models/album';
 
 @Component({
 	selector: 'album-edit',
 	templateUrl: '../views/album-add.html',
 	providers: [UserService, AlbumService, UploadService]
 })

 export class AlbumEditComponent implements OnInit{
 		public titulo: string;
 		public album: Album;
 		//public artist: Artist;
 		public identity;
 		public token;
 		public url: string;
 		public alertMessage;
 		public is_edit;

 		constructor(

 				private _route: ActivatedRoute,
 				private _router: Router,
 				private _userService: UserService,
 				private _uploadService: UploadService,
 				private _albumService: AlbumService
 			){

 			this.titulo = 'Editar album';
 			this.identity = this._userService.getIdentity();
 			this.token = this._userService.getToken();
 			this.url = GLOBAL.url;
 			this.album = new Album('', '', 2017, '', '');
 			this.is_edit = true;
 		}

 		ngOnInit(){
 			console.log('artist-edit.component.ts cargado');
 			//conseguir el album
 			this.getAlbum();
 		}

 		getAlbum(){
 			this._route.params.forEach((params: Params) =>{
 				let id = params['id'];

 				this._albumService.getAlbum(this.token, id).subscribe(
 						response =>{
 							if(!response.album){
 							//this.alertMessage='Error en el Servidor';
 							this._router.navigate(['/']);
 						}else{
 							//this.alertMessage='!El album se ha creado correctamente!';
 							this.album = response.album;
 							
 						}
 						},
 						error =>{
 							var errorMessage = <any>error;
	 						if(errorMessage != null){
			  					var body = JSON.parse(error._body);

			  					console.log(error);
			  				}
 						}
 					);
 			});
 		}

 		onSubmit(){
 			console.log(this.album);
 			this._route.params.forEach((params: Params) =>{
 			let id = params['id'];

 			this._albumService.editAlbum(this.token, id, this.album).subscribe(
 					response =>{
 						
 						if(!response.album){
 							this.alertMessage='Error en el Servidor';
 						}else{
 							this.alertMessage='!El album se ha actualizado correctamente!';

 							if(!this.filesToUpload){
 								this._router.navigate(['/artista', response.album.artist]);
 							}else{
 								//Subir la imagen del artista
 							this._uploadService.makeFileRequest(this.url+'upload-image-album/'+id, [], this.filesToUpload, this.token, 'image')
 							.then(
 									(result) =>{
 										this._router.navigate(['/artista', response.album.artist]);
 									},
 									(error) =>{
 										console.log(error);
 									}
 								);
 							}
 							
 							//this.album = response.album;
 							//this._router.navigate(['/editar.album'], response.album._id);
 						}
 					},
 					error =>{
 						var errorMessage = <any>error;
 						if(errorMessage != null){
		  					var body = JSON.parse(error._body);
		  					this.alertMessage = body.message;

		  					console.log(error);
		  				}
 					}
 				);
 			});
 		}

 		public filesToUpload: Array<File>;

	    fileChangeEvent(fileInput: any){
	      this.filesToUpload = <Array<File>>fileInput.target.files;
	    }
 }
