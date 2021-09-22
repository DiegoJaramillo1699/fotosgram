import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent implements OnInit {

  @Output() avatarSel = new EventEmitter<string>();
  @Input() avatarActual: string = 'av1.png';

  avatars = [
    {
      img: 'av1.png',
      seleccionado: true
    },
    {
      img: 'av2.png',
      seleccionado: false
    },
    {
      img: 'av3.png',
      seleccionado: false
    },
    {
      img: 'av4.png',
      seleccionado: false
    },
    {
      img: 'av5.png',
      seleccionado: false
    },
    {
      img: 'av6.png',
      seleccionado: false
    },
    {
      img: 'av7.png',
      seleccionado: false
    },
    {
      img: 'av8.png',
      seleccionado: false
    },
];

//Opciones para que el slide se vea mejor
  avatarSlide = {
    slidesPerView: 3.5
  };

  constructor() { }

  ngOnInit() {

    this.avatars.forEach( avatar => avatar.seleccionado = false);

    for( const avatar of this.avatars){

      if(avatar.img === this.avatarActual){

        avatar.seleccionado = true;
        break;
      }

    }

  }

  //función para cambiar estilo de avatar seleccionado en formulario 
  //de registro
  seleccionarAvatar(avatar){

    this.avatars.forEach( av => av.seleccionado = false);

    avatar.seleccionado = true;
    console.log(avatar.img);
    this.avatarSel.emit(avatar.img);

  }

}
