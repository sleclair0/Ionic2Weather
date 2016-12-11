import { Component } from '@angular/core';
import { NavController, LoadingController, Refresher } from 'ionic-angular';
import { WeatherService } from '../../providers/weather-service';

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
  constructor(public navCtrl: NavController
    , public weatherData: WeatherService
    , public loadingCtrl: LoadingController
    ) {
      let loader = this.loadingCtrl.create({
          content: "Loading weather data...",
          duration: 2000
      });
      loader.present();

      this.weatherData.getWeather().then(theResult => {
        this.theWeather = theResult;
        this.currentData = this.theWeather.currently;
        this.daily = this.theWeather.daily;
      });
  }

  doRefresh(refresher){
    setTimeout(() => {
      refresher.complete();
    },2000);
  }
  
  ionViewDidLoad() {
    console.log('Hello WeatherPage Page');
  }

}
