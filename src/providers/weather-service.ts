import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { CurrentLoc } from '../app/interfaces/current-loc';

/*
  Generated class for the WeatherService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WeatherService {
  data: any = null;

  constructor(public http: Http) {
    console.log('Hello WeatherService Provider');
  }

  load(currentLoc:CurrentLoc){
    if (this.data){
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      //this.http.get('assets/data/data.json')
      
      //this.http.get('https://api.darksky.net/forecast/030090885e12d4ae1a44e52cbd643535/43.0742365,-89.381011899')
      this.http.get('/api/forecast/'+currentLoc.lat + ',' + currentLoc.lon)
      .map(res => res.json())
      .subscribe(data => {
        this.data=data;
        resolve(this.data);
      });
    } );
  }

  getWeather(currentLoc:CurrentLoc) {
    this.data = null;
    return this.load(currentLoc).then(data => {
      return data;
    });
  }
}
