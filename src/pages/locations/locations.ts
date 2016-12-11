import { Component } from '@angular/core';
import { NavController, AlertController, Events } from 'ionic-angular';
import { WeatherLocation } from '../../app/interfaces/weather-location'
import { LocationsService }  from '../../providers/locations-service';
import { GeocodeService }  from '../../providers/geocode-service';
import { WeatherPage } from '../weather/weather';

@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html'
})
export class LocationsPage {
  locs: Array<WeatherLocation>;

  constructor(public navCtrl: NavController
    , public locations: LocationsService
    , public geocode: GeocodeService
    , public alertCtrl: AlertController
    , public events: Events
  ) {
    locations.getLocations().then(res => {
      this.locs = res;
    });
  }

  deleteLocation(loc) {
    console.log('deleteLocation');
    this.locations.removeLocation(loc);
    this.events.publish('locations:updated',{});
  }
  addLocation() {
    let prompt = this.alertCtrl.create({
      title: 'Add a City',
      message: "Enter the city's name",
      inputs: [
        {
          name: 'title',
          placeholder: 'City name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: data => {
            console.log('Saved clicked');
            if (data.title != '') {
              this.geocode.getLatLong(data.title).then(res => {
                let newLoc = { title: '', component: WeatherPage, icon: 'pin', 
                              loc: { lat: 0, lon: 0 } }
                newLoc.title = res.name;
                newLoc.loc.lat = res.location.latitude;
                newLoc.loc.lon = res.location.longitude;

                this.locations.addLocation(newLoc);
                this.events.publish('locations:updated',{});
              });
            }
          }
        }
      ]
    });

    prompt.present();
  }

  ionViewDidLoad() {
    console.log('Hello LocationsPage Page');
  }

}
