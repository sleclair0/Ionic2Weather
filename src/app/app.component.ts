import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { WeatherPage } from '../pages/weather/weather';
import { LocationsPage } from '../pages/locations/locations';
import { WeatherService } from '../providers/weather-service';
import { CurrentLoc } from '../app/interfaces/current-loc';
import { LocationsService } from '../providers/locations-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = WeatherPage;

  pages: Array<{title: string, component: any, icon: string, loc?:CurrentLoc}>;

  constructor(public platform: Platform
  , public weatherData: WeatherService
  , public locations: LocationsService
  , public events: Events
  ) {
    this.initializeApp();
    this.getMyLocations();
    events.subscribe('locations:updated', (data) => {
      this.getMyLocations();
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  getMyLocations(){
    this.locations.getLocations().then(res => {
      this.pages = [
        { title: 'Edit Locations', component: LocationsPage, icon: 'create' },
        { title: 'Current Location', component: WeatherPage, icon: 'pin' }
      ];
      for (let newLoc of res) {
        this.pages.push(newLoc);
      }
    });
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.hasOwnProperty('loc') ) {
      this.nav.setRoot(page.component, {geoloc: page.loc,title: page.title});
    } else {
      this.nav.setRoot(page.component);
    }
  }
}
