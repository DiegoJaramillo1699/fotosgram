import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable,EventEmitter } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';


import { environment } from '../../environments/environment';
import { RespuestaPosts, Post } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPosts = 0;

  //Para emitir evento cada vez que se cree un post
  nuevoPost = new EventEmitter();


  constructor(private http: HttpClient, private usuarioService: UsuarioService,
    private fileTransfer: FileTransfer) { }

  getPosts(pull: boolean = false){

    if(pull){
      this.paginaPosts = 0;
    }

    this.paginaPosts++;
    return this.http.get<RespuestaPosts>(`${ URL }/post/?pagina=${ this.paginaPosts }`);

  }

  crearPost( post ){

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return new Promise( resolve =>{

      this.http.post(`${ URL }/post/`,post, {headers})
      .subscribe( resp => {
  
        //Si se crea correctamente el post
        //emito un evento que contiene ese nuevo post para no 
        //recargar la página cada vez que se inserte
        this.nuevoPost.emit( resp['post']);
        resolve(true);
        console.log(resp);
  
      })


    } )


  }

  subirImagen( img: string){

    const options: FileUploadOptions = {

      fileKey: 'image',
      headers:{
        'x-token': this.usuarioService.token
      }

    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    fileTransfer.upload(img, `${URL}/post/upload`, options)
    .then( data =>{

      console.log(data);

    }).catch( err =>{
      console.log('Error en carga', err);
    }); 
  }
}
