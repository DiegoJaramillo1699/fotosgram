import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExploreContainerComponent } from './explore-container/explore-container.component';
import { ExploreContainerComponentModule } from './explore-container/explore-container.module';

import {HttpClientModule} from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';


import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera } from '@ionic-native/camera/ngx';

import { FileTransfer } from '@ionic-native/file-transfer/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    IonicStorageModule.forRoot(),
    HttpClientModule,
    BrowserModule,
     IonicModule.forRoot(),
      AppRoutingModule,
       ExploreContainerComponentModule, ],
  providers: [
    FileTransfer,
    Camera,
    Geolocation
    ,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
