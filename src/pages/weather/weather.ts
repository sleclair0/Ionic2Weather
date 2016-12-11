import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Refresher } from 'ionic-angular';
import { WeatherService } from '../../providers/weather-service';
import { Geolocation } from 'ionic-native';
import { CurrentLoc } from '../../app/interfaces/current-loc';

@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html'
})
export class WeatherPage {
  theWeather: any = {};
  currentData: any = {};
  daily: any = {};
  loading: LoadingController;
  refresher: Refresher;
  currentLoc: CurrentLoc = {lat:0,lon:0};
  pageTitle:string = 'Current Location';
      
  constructor(public navCtrl: NavController
    , public weatherData: WeatherService
    , public loadingCtrl: LoadingController
    , public navParams: NavParams
    ) {
      let loader = this.loadingCtrl.create({
          content: "Loading weather data...",
          duration: 2000
      });
      loader.present();

      let loc = this.navParams.get('geoloc');
      let title = this.navParams.get('title');

      if (loc === undefined) {
        Geolocation.getCurrentPosition().then(pos => {
          console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
          this.currentLoc.lat = pos.coords.latitude;
          this.currentLoc.lon = pos.coords.longitude;
          this.currentLoc.timestamp = pos.timestamp;
          return this.currentLoc;
        }).then(currentLoc => {
          this.currentLoc = loc;
          this.pageTitle = title;
          console.log("pageTitle: " + this.pageTitle);
      
          weatherData.getWeather(currentLoc).then(theResult => {
            this.theWeather = theResult;
            this.currentData = this.theWeather.currently;
            this.daily = this.theWeather.daily;
            loader.dismiss();
          });
        });
      } else {
        this.currentLoc = loc;

        weatherData.getWeather(this.currentLoc).then(theResult => {
          this.theWeather = theResult;
          this.currentData = this.theWeather.currently;
          this.daily = this.theWeather.daily;
          loader.dismiss();
        });
      }
      
  }

doRefresh(refresher) {
  this.weatherData.getWeather(this.currentLoc).then(theResult => {
    this.theWeather = theResult;
    this.currentData = this.theWeather.currently;
    this.daily = this.theWeather.daily;
    refresher.complete();
  });
}

  ionViewDidLoad() {
    console.log('Hello WeatherPage Page');
  }

}
