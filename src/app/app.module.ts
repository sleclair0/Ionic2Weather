import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { WeatherPage } from '../pages/weather/weather';
import { LocationsPage } from '../pages/locations/locations';
import { WeatherService } from '../providers/weather-service';
import { GeocodeService } from '../providers/geocode-service';
import { LocationsService }  from '../providers/locations-service';
import { Weathericon } from '../pipes/weathericon';

@NgModule({
  declarations: [
    MyApp,
    WeatherPage,
    LocationsPage,
    Weathericon
  ],
  imports: [
  IonicModule.forRoot(MyApp, { menuType: 'push',
  platforms: {
   md: {
     menuType: 'reveal',
   }
  }})
],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WeatherPage,
    LocationsPage
  ],
  providers: [WeatherService, GeocodeService, LocationsService]
})
export class AppModule {}
