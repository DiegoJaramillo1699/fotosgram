import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../interfaces/interfaces';
import { PostsService } from '../../services/posts.service';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


declare var window: any;
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: string[] = []; 

  post = {
    mensaje: '',
    coords: null,
    posicion: false
  }

  //Variable para controlar el spinner en el  HTML
  cargandoGeo = false;

  constructor(private postService: PostsService,
            private route: Router,
            private geoLocation: Geolocation,
            private camera: Camera) {}

  async crearPost(){

    console.log(this.post);
    const creado = await this.postService.crearPost(this.post);

    this.post = {
      mensaje: '',
      coords: null,
      posicion: false
    };

    this.route.navigateByUrl('/main/tabs/tab1');

  }

  getGeo(){

    if(!this.post.posicion){
      this.post.coords = null;
      return;
    }

    this.cargandoGeo = true;

   this.geoLocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.cargandoGeo = false;

      const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
      
      this.post.coords = coords;

      console.log(coords);
     }).catch((error) => {
       console.log('Error getting location', error);
       this.cargandoGeo = false;
     });

    console.log(this.post);


  }

  camara(){

    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     //let base64Image = 'data:image/jpeg;base64,' + imageData;
    
     //Vamos a utilizar la imagen con el webview de Ionic

     const img = window.Ionic.WebView.convertFileSrc(imageData);
     console.log(img);

     this.tempImages.push(img);

    }, (err) => {
     // Handle error
    });


  }


}
