import { Component, OnInit} from '@angular/core';

import { GLOBAL } from '../services/global';
import { Song } from '../models/song';


 @Component({
 	selector: 'player',
 	template: `
 		<div class="album-image">
 			<span *ngIf="song.album">
 				<img id="play-image-album" src="{{ url + 'get-image-album/' + song.album.image}}" />
 			</span>
 			<span *ngIf="!song.album">
 				<img id="play-image-album" src="assets/image/default.jpg" />
 			</span>
 		</div>
 		<div class="audio-file">
 			<p>Reproduciendo</p>
 			<span id="play-song-title">
 				{{song.name}}
 			</span>
 			 | 
 			<span id="play-song-artist">
 				<span *ngIf="song.album.artist">
 					{{song.album.artist.name}}
 				</span>
 			</span>
 		</div>
 		<audio controls id="player">
			<source id="mp3-source" src="{{ url + 'get-file-song/' + song.file }}" type="audio/mpeg" />
			 El navegador web no soporta la reproducción del audio		
		</audio>
 	` 
 })

export class PlayerComponent implements OnInit{

 	public url: string;
 	public song;

 	constructor(){
 		this.url = GLOBAL.url;
 		this.song = new Song(1, '', '', '', '');
 	}
 	ngOnInit(){
 		console.log('player cargado...');
 	}

 }