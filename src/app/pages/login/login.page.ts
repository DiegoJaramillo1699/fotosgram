import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import { Usuario } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  @ViewChild('mainSlide', { static: false }) slides: IonSlides;

  

  //Objeto para controlar el login 
  loginUser ={
    email: 'diego.2@gmail.com',
    password: '123456'
  };

  //Objeto para controlar el registro
  registroUser: Usuario= {
    email: 'test@test.com',
    password:'123456',
    nombre: 'test',
    avatar:'av1.png'

  };

  constructor(private usuarioService: UsuarioService,
              private navCtrl: NavController,
              private uiService: UiServiceService) { }

  ngOnInit() {
    console.log(this.slides);

  }

   ionViewDidEnter() {
     this.slides.lockSwipes(true);
    console.log(this.slides);
     }

  async login(fLogin: NgForm){


    if(fLogin.invalid){
      return;
    }

    const valido = await this.usuarioService.login(this.loginUser.email, this.loginUser.password);

    if(valido){
      //Navegar al tabs

      //Para que al viajar al tabs, no pueda darle hacía atrás 
      //Esto principalmente será notorio en móviles
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated:true });
    }
    else{
      //Mostrar alerta de usuario y contraseña no correctos
      this.uiService.alertaInformativa("Usuario y contraseña inválidos.");
    }

    console.log(fLogin.valid);
    console.log(this.loginUser)
  }

  async registro(fRegistro: NgForm){
  
    if(fRegistro.invalid){
      return;
    }

    const valido = await this.usuarioService.registro(this.registroUser);

    if(valido){
      //Navegar al tabs

      //Para que al viajar al tabs, no pueda darle hacía atrás 
      //Esto principalmente será notorio en móviles
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated:true });
    }
    else{
      //Mostrar alerta de usuario y contraseña no correctos
      this.uiService.alertaInformativa("Ese correo electrónico ya existe.");
    }

    

  }

  

  //Función para cambiar de slides cuando oprimamos los botones
  mostrarRegistro(){
    console.log("hola");
    this.slides.lockSwipes(false);
    this.slides.slideTo(0,500).then( res =>{

      console.log(res);
    });
    this.slides.lockSwipes(true);
    //this.slides.slidePrev();
  }

  mostrarLogin(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(1,500);
    this.slides.lockSwipes(true);
    //this.slides.slideNext();
  }

}
